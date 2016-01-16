# >> HEADERS
override COMPOSER_ABSPATH := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
override COMPOSER_TEACHER := $(abspath $(COMPOSER_ABSPATH)/../Makefile)

# >> DEFINITIONS
override COMPOSER_TARGETS ?= composer gary-os
override COMPOSER_SUBDIRS ?=
override COMPOSER_DEPENDS ?=

# >> VARIABLES

# >> INCLUDE
include $(COMPOSER_TEACHER)
.DEFAULT_GOAL := all

.PHONY: $(COMPOSER_TARGETS)
$(COMPOSER_TARGETS):
	$(CP) -L /.g/_data/zactive/coding/$(@)/README.md $(@)/index.md
	$(SED) -i \
		-e "/^[%][ ]/d" \
		-e "s%&%+%g" \
		-e "s%([(])(icon|screenshot)%\1projects/$(@)/\2%g" \
		\
		-e "s%^([[])([^]]+)([]][:][ ][#]).+$$%\1\2\3\2%g" \
		-e  "/^([[])([^]]+)([]][:][ ][#]).+$$/s%[ ]%_%3" \
		\
		-e  "/^([[])([^]]+)([]][:][_][#]).+$$/s%[ ]%_%3" \
		-e  "/^([[])([^]]+)([]][:][_][#]).+$$/s%[ ]%_%3" \
		\
		-e "s%([#])Release_Notes%\1Version_History%g" \
		-e "s%([#])Minimal_X.Org_GUI%\1Minimal_X-Org_GUI%g" \
		-e "s%[_][#]% #%g" \
		$(@)/index.md
