# vscode-kibit-runner

Runs [kibit](https://github.com/jonase/kibit) on current file.

## Requirements

Add `[lein-kibit "0.1.6"]` to `:plugins` section in your `project.clj` or to your `:user` profile plugins in `~/.lein/profiles.clj`:
```clojure
{:user {:plugins [[lein-kibit "0.1.6"]]}}
```

## Extension Commands

* `Kibit runner: Run kibit on current file`
* `Kibit runner: Run kibit on current file and let it do replaces`
* `Kibit runner: Clear kibit warnings`
