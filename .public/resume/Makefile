# >> HEADERS
override COMPOSER_ABSPATH := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
override COMPOSER_TEACHER := $(abspath $(COMPOSER_ABSPATH)/../Makefile)

# >> DEFINITIONS
override COMPOSER_TARGETS ?= \
	resume_manager \
	$(foreach FILE,html pdf docx txt,resume.$(FILE)) \
	$(foreach FILE,html pdf docx txt,resume-manager.$(FILE))
override COMPOSER_SUBDIRS ?=
override COMPOSER_DEPENDS ?=

# >> VARIABLES
override LVL ?=
override MGN ?= 1.0in
override OPT ?= --reference-docx="./resume.template.docx"

# >> INCLUDE
include $(COMPOSER_TEACHER)
.DEFAULT_GOAL := all

.PHONY: resume_manager
resume_manager:
	$(SED) "s|Pathfinder \& Technologist|Technologist \& Product/Program/Project Manager|g" resume.md >resume-manager.md
