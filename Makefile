install:
	npm ci

publish:
	npm publish --dry-run

test:
	npm run test

test-coverage:
	npm run test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
