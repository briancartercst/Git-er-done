# CONTRIBUTING

The NodeRequest project welcomes new contributors.  This document will guide you
through the process.


### FORK

Fork the project [on GitHub](https://github.com/ChipSoftTech/NodeRequest.git) and check out
your copy.

```
$ git clone https://github.com/ChipSoftTech/noderequest.git
$ cd node
$ git remote add upstream https://github.com/ChipSoftTech/noderequest.git
```

Now decide if you want your feature or bug fix to go into the master branch
or the stable branch.  As a rule of thumb, bug fixes go into the stable branch
while new features go into the master branch.

The stable branch is effectively frozen; patches that change the NodeRequest
or affect the run-time behavior of applications get rejected.

The rules for the master branch are less strict; consult the
[stability index page][] for details.

In a nutshell, bug fixes are always welcome but API or behavioral  
changes are off-limits.

In case of doubt, open an issue in the [issue tracker][], post your question
to the [node.js mailing list][] or contact one of the [project maintainers][]
on [IRC][].

Especially do so if you plan to work on something big.  Nothing is more
frustrating than seeing your hard work go to waste because your vision
does not align with that of a project maintainer.


### BRANCH

Okay, so you have decided on the proper branch.  Create a feature branch
and start hacking:

```
$ git checkout -b my-feature-branch -t origin/v0.10
```

(Where v0.10 is the latest stable branch as of this writing.)


### COMMIT

Make sure git knows your name and email address:

```
$ git config --global user.name "J. Random User"
$ git config --global user.email "j.random.user@example.com"
```

Writing good commit logs is important.  A commit log should describe what
changed and why.  Follow these guidelines when writing one:

1. The first line should be 50 characters or less and contain a short
   description of the change prefixed with the name of the changed
   subsystem (e.g. "net: add localAddress and localPort to Socket").
2. Keep the second line blank.
3. Wrap all other lines at 72 columns.

A good commit log looks like this:

```
subsystem: explaining the commit in one line

Body of commit message is a few lines of text, explaining things
in more detail, possibly giving some background about the issue
being fixed, etc etc.

The body of the commit message can be several paragraphs, and
please do proper word-wrap and keep columns shorter than about
72 characters or so. That way `git log` will show things
nicely even when it is indented.
```

The header line should be meaningful; it is what other people see when they
run `git shortlog` or `git log --oneline`.

Check the output of `git log --oneline files_that_you_changed` to find out
what subsystem (or subsystems) your changes touch.


### REBASE

Use `git rebase` (not `git merge`) to sync your work from time to time.

```
$ git fetch upstream
$ git rebase upstream/v0.10  # or upstream/master
```


### TEST

Bug fixes and features should come with tests.  Add your tests in the
test/simple/ directory.  Look at other tests to see how they should be
structured (license boilerplate, common includes, etc.).

```
$ make jslint test
```

Make sure the linter is happy and that all tests pass.  Please, do not submit
patches that fail either check.

If you are updating tests and just want to run a single test to check it, 
you can run tests directly with node:

```
node ./test/simple/test-streams2-transform.js
```


### PUSH

```
$ git push origin my-feature-branch
```

Go to https://github.com/username/noderequest and select your feature branch.  Click
the 'Pull Request' button and fill out the form.

Pull requests are usually reviewed within a few days.  If there are comments
to address, apply your changes in a separate commit and push that to your
feature branch.  Post a comment in the pull request afterwards; GitHub does
not send out notifications when you add commits.


### CONTRIBUTOR LICENSE AGREEMENT

Please visit http://x.html and sign the Contributor License
Agreement.  You only need to do that once.

