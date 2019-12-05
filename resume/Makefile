# >> HEADERS
override COMPOSER_ABSPATH := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
override COMPOSER_TEACHER := $(abspath $(COMPOSER_ABSPATH)/../Makefile)

# >> DEFINITIONS
override COMPOSER_TARGETS ?= \
	resume_hacks \
	$(foreach FILE,html pdf docx txt,resume-cover.$(FILE)) \
	$(foreach FILE,html pdf docx txt,resume.$(FILE)) \
	$(foreach TYPE,ocm pjm pdm,$(foreach FILE,html pdf docx txt,resume-$(TYPE).$(FILE))) \
	resume_docx
override COMPOSER_SUBDIRS ?=
override COMPOSER_DEPENDS ?=

# >> VARIABLES
override LVL ?=
override MGN ?= 0.8in
override OPT ?= --reference-docx="./resume.template.docx"

# >> INCLUDE
include $(COMPOSER_TEACHER)
.DEFAULT_GOAL := all

.PHONY: resume_hacks
resume_hacks:
	$(SED) -e "s|Pathfinder \& Technologist|Organizational Change Manager|g"	resume.md > resume-ocm.md
	$(SED) -e "s|Pathfinder \& Technologist|Senior Project Manager|g"		resume.md > resume-pjm.md
	$(SED) -e "s|Pathfinder \& Technologist|Senior Product Manager|g"		resume.md > resume-pdm.md
	touch --reference resume.md resume-{ocm,pjm,pdm}.md

override DOCX_TARGETS := $(foreach TYPE,ocm pjm pdm,resume-$(TYPE).docx)

.PHONY: resume_docx
resume_docx: $(DOCX_TARGETS)

$(DOCX_TARGETS): resume.docx
	$(CP) resume.docx $(@)
