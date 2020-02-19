#!/usr/bin/env bash
source ${HOME}/.bashrc

RESUME="resume.md"
_COVER="resume-cover.md"

declare DIR="$(dirname ${_SELF})"
declare BAS="${DIR}/${RESUME}.BAK"
declare PST=""
declare CVR="-cover.md"

declare RES_OLD="$(${LS} ${BAS}-[0-9].[0-9]		| tail -n2 | head -n1)"
declare RES_NEW="$(${LS} ${BAS}-[0-9].[0-9]		| tail -n1)"
declare RES_MIN="$(echo "${RES_NEW}"			| ${SED} "s|^.+([0-9])[.]([0-9]).*$|\2|g")"
declare RES_MAJ="$(echo "${RES_NEW}"			| ${SED} "s|^.+([0-9])[.]([0-9]).*$|\1|g")"

declare CVR_OLD="$(${LS} ${BAS}-[0-9].[0-9]${CVR}	| tail -n2 | head -n1)"
declare CVR_NEW="$(${LS} ${BAS}-[0-9].[0-9]${CVR}	| tail -n1)"
declare CVR_MIN="$(echo "${CVR_NEW}"			| ${SED} "s|^.+([0-9])[.]([0-9]).*$|\2|g")"
declare CVR_MAJ="$(echo "${CVR_NEW}"			| ${SED} "s|^.+([0-9])[.]([0-9]).*$|\1|g")"

declare NEW_MIN="${RES_MAJ}.$((${RES_MIN}+1))"
declare NEW_MAJ="$((${RES_MAJ}+1)).0"

echo -en "
OLD: ${RES_OLD}
NEW: ${RES_NEW}
VER: ${RES_MAJ}.${RES_MIN}

OLD: ${CVR_OLD}
NEW: ${CVR_NEW}
VER: ${CVR_MAJ}.${CVR_MIN}

MIN: ${NEW_MIN}
MAJ: ${NEW_MAJ}
\n"

chown -R plastic ${DIR}

function update {
	declare OLD=
	declare NEW=
	declare EXT=
	declare REV=
	declare VER=
	if [[ ${1} == -r ]]; then OLD="${RES_NEW}"; NEW="${DIR}/${RESUME}"; EXT="${RES}"; REV="${RES_MAJ}.${RES_MIN}"; shift; fi
	if [[ ${1} == -c ]]; then OLD="${CVR_NEW}"; NEW="${DIR}/${_COVER}"; EXT="${CVR}"; REV="${CVR_MAJ}.${CVR_MIN}"; shift; fi
	if [[ ${1} == -n ]]; then VER="${NEW_MIN}"; shift; fi
	if [[ ${1} == -m ]]; then VER="${NEW_MAJ}"; shift; fi
	${RSYNC_U}	${OLD}				${BAS}-${VER}${EXT}
	${SED} -i	"s|^([%][ ]v)${REV}|\1${VER}|g"	${BAS}-${VER}${EXT}
	${LN}		$(basename ${BAS})-${VER}${EXT}	${NEW}
}

if [[ -n ${1} ]]; then
	if [[ ${1} == -n ]]; then shift
		update -r -n
		if [[ ${1} == -c ]]; then shift
			update -c -n
		fi
	fi
	if [[ ${1} == -m ]]; then shift
		update -r -m
		if [[ ${1} == -c ]]; then shift
			update -c -m
		fi
	fi
else
	view ${RES_NEW} ${CVR_NEW}
	vdiff ${RES_OLD} ${RES_NEW}
	vdiff ${CVR_OLD} ${CVR_NEW}
fi

(cd $(dirname ${DIR}) && vdiff -g)
(cd $(dirname ${DIR}) && git-perms root)

exit 0
# end of file
