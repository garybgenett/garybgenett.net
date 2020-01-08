#!/usr/bin/env bash
source ${HOME}/.bashrc

cd $(dirname ${_SELF})
chown -R plastic ./
view resume.md resume-cover.md
vdiff $(ls resume.md.BAK-[0-9].[0-9]		| tail -n2 | head -n1) resume.md
vdiff $(ls resume.md.BAK-[0-9].[0-9]-cover.md	| tail -n2 | head -n1) resume-cover.md

cd ../
git-perms root

exit 0
# end of file
