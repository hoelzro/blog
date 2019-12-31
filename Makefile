build:
	rm -rf site
	./tiddlywiki --output site --build index
	mkdir site/images
	cp tiddlers/*.png site/images
	perl build-index.pl site

clean:
	rm -rf site
