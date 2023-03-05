install:
	npm ci

publish:
	npm publish --dry-run

test:
	npm run test

lint:
	npx eslint .
