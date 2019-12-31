build:
	rm -rf /tmp/site
	./tiddlywiki --output /tmp/site --build index
	mkdir /tmp/site/images
	cp tiddlers/*.png /tmp/site/images
	perl build-index.pl /tmp/site

clean:
	rm -rf /tmp/site
