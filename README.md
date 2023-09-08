# genDiff

[![Actions Status](https://github.com/juliaovod/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/juliaovod/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/juliaovod/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/juliaovod/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/93f5dc8cf8fef23501fe/maintainability)](https://codeclimate.com/github/juliaovod/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/93f5dc8cf8fef23501fe/test_coverage)](https://codeclimate.com/github/juliaovod/frontend-project-lvl2/test_coverage)

Outputs the difference between 2 files (JSON, YAML) with formatting

```bash
# Usage information
gendiff -h

# Generate diff, plain formatter
gendiff --f=plain filepath1.json filepath1.json
```

Supported file formats:
* .json
* .yaml or .yml

See asciicasts of `gendiff` output in different formats (use `-f` or `--format` option):

1. [stylish](https://asciinema.org/a/lJkPsJPr10JaQbwv0nWLxZ1rh) (default formatter)
2. [plain](https://asciinema.org/a/4dMJS27T5Tb7Sjumkc7f6gMta)
3. [json](https://asciinema.org/a/yNSxTGXXtkUm2QJyMsUdLIqG6)
