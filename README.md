# move-github-repository

It make your repository "301 Moved Permanently".

It does:

- Update description && homepage
- Create "301_moved_permanently" branch that has a README.md
- Set "301_moved_permanently" as default branch
    - It aim to preserve exist link

## Install

Install with [npm](https://www.npmjs.com/):

    npm install -g move-github-repository

## Usage


    Usage
      $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

    Options
      --description -d Description repository
      --homepage -h    New URL
      
    Env
      GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

    Examples
      $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

## Example

     GH_TOKEN="xxxx" move-github-repository -d "[301 Moved]" -h "https://github.com/azu/move-github-repository"


Result: <https://github.com/azu/movemovemomvomeove>

Also:

- [textlint/txt-to-ast: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/txt-to-ast "textlint/txt-to-ast: [CAUTION] This repository is MOVED to monorepo.")
- [textlint/textlint-plugin-text: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/textlint-plugin-text "textlint/textlint-plugin-text: [CAUTION] This repository is MOVED to monorepo.")
- [textlint/textlint-plugin-markdown: [CAUTION] This repository is MOVED to monorepo.](https://github.com/textlint/textlint-plugin-markdown "textlint/textlint-plugin-markdown: [CAUTION] This repository is MOVED to monorepo.")


## Changelog

See [Releases page](https://github.com/azu/move-github-repository/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/move-github-repository/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
