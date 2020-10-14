build:
	rm -rf site
	./tiddlywiki --output site --build index
	mkdir site/images
	cp tiddlers/*.png site/images
	cp tiddlers/*.jpg site/images
	python build-index.py site

clean:
	rm -rf site
