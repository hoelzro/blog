#!/usr/bin/env perl

use strict;
use warnings;
use feature qw(say);
use experimental qw(signatures);

use DBI;
use File::Find;
use File::Slurper qw(read_text);
use Mojo::DOM;

sub index_document($sth, $name, $path, $rel_url) {
    my $dom = Mojo::DOM->new(read_text($path));

    my $tag_elements = $dom->find('div.tags a');
    my $title = $dom->find('head title')->first->text;
    my @tags = map { $_->text } @$tag_elements;

    my $body = $dom->find('#content')->first;
    $body->find('.history-prev')->map('remove');
    $body->find('.history-next')->map('remove');
    $body->find('div.tags')->map('remove');
    $body->find('.publish-date')->map('remove');
    $body->find('noscript')->map('remove');

    $sth->execute($title, join(' ', @tags), $body->all_text, $rel_url);
}

die "usage: $0 [site]\n" unless @ARGV;

my ( $site ) = @ARGV;

die "$site is not a directory" unless -d $site;

my $index_location = File::Spec->catfile($site, 'search-index.db');

my $dbh = DBI->connect('dbi:SQLite:dbname=' . $index_location, undef, undef, {
    RaiseError => 1,
    PrintError => 0,
});

$dbh->do(<<'END_SQL');
DROP TABLE IF EXISTS pages
END_SQL

$dbh->do(<<'END_SQL');
CREATE VIRTUAL TABLE pages USING fts5(title, tags, body, url UNINDEXED)
END_SQL

my $insert_sth = $dbh->prepare('INSERT INTO pages (title, tags, body, url) VALUES (?, ?, ?, ?)');

$dbh->begin_work;
find({ wanted => sub {
    return unless -f && /[.]html$/;
    my $path = File::Spec->abs2rel($File::Find::name, $site);

    say $path;

    return if $path =~ m{^archive};        # don't index the blog archive
    return if $path =~ m{^blog-series};    # don't index the blog series page
    return if $path =~ m{^tag/};           # don't index tag pages
    return if $path =~ m{blog/\d+[.]html}; # don't index blog roll pages
    return if $path =~ m{blog/drafts/};    # don't index blog drafts
    return if $path =~ m{^\d+[.]html};     # don't index status pages
    return if $path eq 'home.html';        # don't index the home page
    return if $path eq 'projects.html';    # don't index the projects page
    return if $path eq 'ref/home.html';    # don't index the ref page

    $path =~ s/[.]html$//;
    say $path;
    index_document($insert_sth, $path, $_, File::Spec->abs2rel($_, $site) =~ s/[.]html$//r);
}, no_chdir => 1 }, $site);
$dbh->commit;
