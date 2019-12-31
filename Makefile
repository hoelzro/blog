build:
	rm -rf site
	./tiddlywiki --output site --build index
	mkdir site/images
	cp tiddlers/*.png site/images

clean:
	rm -rf site
