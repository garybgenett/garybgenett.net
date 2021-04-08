export PS1="${ROOTFS_FUNC}@${_TITLE} \w> "

alias ${ROOTFS_NAME}="exec /bin/sh /initrc ${ROOTFS_NAME}"
alias un${ROOTFS_NAME}="exec /bin/sh /initrc un${ROOTFS_NAME}"

if ${ROOTFS_TEST}; then
	alias boot="kill -SIGQUIT 1"
	set -o vi
fi
