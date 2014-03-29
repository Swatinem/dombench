JS_FILES := $(shell find lib/ -name "*.js")
STYLUS_FILES := $(shell find stylus/ -name "*.styl")

all: deploy/index.html deploy/index.css deploy/index.js

deploy/index.html: index.jade
	./node_modules/.bin/jade --pretty --out deploy index.jade

deploy/index.css: $(STYLUS_FILES)
	./node_modules/.bin/stylus --include-css --out deploy stylus/index.styl

deploy/index.js: components $(JS_FILES)
	./node_modules/.bin/component build --out deploy --name index

components: component.json
	./node_modules/.bin/component install --dev
	@touch components

clean:
	rm -rf components deploy

lint:
	-./node_modules/.bin/jshint ./lib

.PHONY: all clean lint
