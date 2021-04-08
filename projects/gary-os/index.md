# Welcome to GaryOS (gary-os)

--------------------------------------------------------------------------------

![GaryOS Icon](projects/gary-os/images/icon.png "GaryOS Icon")
"The one file that does it all."

  * Latest: GaryOS v4.0 ([Kernel]) ([Rootfs]) ([Grub]) ([Notes]) ([License])
  * Homepage: <https://github.com/garybgenett/gary-os>
  * Download: <https://sourceforge.net/projects/gary-os>

[Homepage]: https://github.com/garybgenett/gary-os
[Download]: https://sourceforge.net/projects/gary-os

[Gary B. Genett]: http://www.garybgenett.net
[gary-os@garybgenett.net]: mailto:gary-os@garybgenett.net?subject=GaryOS%20Submission+body=Why%20I%20love%20GaryOS%20so%20much...

<!-- [![GaryOS Download Button](https://a.fsdn.com/con/app/sf-download-button)](https://sourceforge.net/projects/gary-os/files/latest/download) -->
[![GaryOS Download Counts](https://img.shields.io/sourceforge/dm/gary-os.svg)](https://sourceforge.net/projects/gary-os/files/latest/download)

--------------------------------------------------------------------------------

  * [Introduction]
    * [Overview]
    * [Release] -- [Quick Start] / [Requirements] / [Contact + Support]
    * [Project] -- [Acknowledgements + Reviews] / [Contributions] / [Contributing] / [Licensing + Disclaimer]
  * [Information]
    * [Design] -- [Goals] / [Advantages] / [Limitations] / [History]
    * [Details] -- [Versioning] / [Structure] / [Tools] / [Ecosystem]
  * [Instructions]
    * [Booting] -- [Boot Methods] / [Grub Rescue] / [Using Linux] / [Using Windows] / [EFI] / [PXE]
    * [Running] -- [Primary Uses] / [Networking Configuration] / [Graphical Interface]
    * [Building] -- [Live Update] / [Custom Builds] / [Hard Drive Install]
  * [Version History]
    * [v4.0 2020-XX-XX] / [v3.0 2015-03-16] / [v2.0 2014-06-19] / [v1.1 2014-03-13] / [v1.0 2014-02-28] / [v0.3 2014-02-24] / [v0.2 2014-02-13] / [v0.1 2014-02-09]
  * [Release Process + Checklist]

--------------------------------------------------------------------------------

# Introduction #################################################################
[Introduction]: #Introduction

## Overview ####################################################################
[Overview]: #Overview

<!-- #WORK: FINAL REVIEW -->

GaryOS is an entire GNU/Linux system in a single bootable file.  It is also
a build system to produce both the bootable file and entire installations.

The booted system consists of a Linux kernel and a Funtoo (based on Gentoo)
initramfs.  It is generated using a customized Portage configuration with
a modified Linux kernel configuration (based on the latest Grml default).  The
included build system is entirely specialized for the task.  GaryOS can build
itself from within itself.

There are no major projects which take this same approach on this scale.  The
result is a self-contained file that is more flexible and capable than other
live systems.

Primary features:

  * Comprehensive: complete and optimized Funtoo system with GNU toolchain
  * Invisible: resides completely in memory and does not need media after boot
  * Safe: no hard drives are mounted and swap is disabled
  * Flexible: can be used anywhere a Linux kernel can (USB, PXE, etc.)
  * Portable: small footprint can easily fit on any partition
  * Usable: upgrades are as simple as replacing the file
  * Adaptable: supports source-based package options and custom builds
  * Complete: bootloader and direct-to-disk install of a ready-to-use system
  * Fast: everything lives in memory, so all operations happen very rapidly

Designed for several specific uses (details in [Primary Uses]):

  * Forensics, Rescue + Recovery
  * Anonymous + Secure Workstation
  * GNU/Linux Training + Learning
  * Gentoo + Funtoo Installation

The goal of GaryOS is to provide a single, simple file which can be
conveniently used for system rescue or installation, or as a temporary
workstation for productivity or learning.  In parallel with this is the
objective of maintaining a usable build system to create GaryOS or other custom
systems.

![GaryOS CLI Screenshot](projects/gary-os/images/screenshot_cli.png "GaryOS CLI Screenshot")

![GaryOS GUI Screenshot](projects/gary-os/images/screenshot_gui.png "GaryOS GUI Screenshot")

## Release #####################################################################
[Release]: #Release

### Quick Start ################################################################
[Quick Start]: #Quick_Start

GaryOS releases are not stored in the Git repository, due to size.  The first
step is to download the latest [Kernel].

The simplest way to try GaryOS is using the [Qemu] virtual machine emulator,
which runs on all major platforms.  Once installed, you can boot GaryOS
directly using something like:

  * `qemu-system-x86_64 -m 4096 -kernel [...]/gary-os-[...].kernel`

To use it "for real", follow the brief instructions in the [Using Linux] or
[Using Windows] sections, depending on your platform.  Apple platforms are not
supported.

For advanced users with an existing bootloader (such as Grub), you can add an
entry pointing to the file on disk.  In Grub, this looks something like:

  * `linux (hd0,1)/boot/gary-os-[...].kernel`

All the standard Linux kernel options/parameters are valid.  For example, the
amount of memory Linux allocates to itself can be specified as usual:

  * `linux (hd0,1)/boot/gary-os-[...].kernel mem=4096m`

Once booted, the entire system resides in memory, and any media used to boot it
is no longer necessary.

  * Log in as `root` with password `gary-os`.

After use, the system may simply be powered off.  There is no need to shutdown
GaryOS, since it will boot completely fresh from the file each time.

### Requirements ###############################################################
[Requirements]: #Requirements

A 64-bit x86 CPU is required.  GaryOS is not built for any other platforms.
Intel and AMD x86 processors are by far the most common for desktop and laptop
computers, which is what GaryOS was designed for.  Due to fundamental internal
hardware differences, and the lack of an available development system, Apple
platforms are not supported.

The booted system requires at least 4GB of RAM.  Some of the advanced features
and uses require additional memory, and 8GB is recommended.

<!--
#WORK : this is no longer completely true... yay!
#WORK ~350m grub (\<250m?) limit for size, and keeping under ~4gb ram
#WORK fspack=~350m(kernel) keepdirs=~3g(4g) fsarch=~6g(8g)

#WORK : other rationale
#	stability
#	distfiles go missing or checksums fail -> provide archive
#	lots of build dependencies and conflicting use flags -> overlay and gentoo configs
#WORK : boot stages: 1 -> 2a/2b -> 3
-->

The GaryOS kernel is roughly ~750MB in size, and at least 1GB of storage is
recommended.  All efforts have been made to make GaryOS as compact as possible,
but required Linux packages continue to grow over time, such as these:

  * GCC
  * Linux firmware
  * Grub
  * Python (still needs both v2.x and v3.x for a complete system)
  * Glibc

This list is not meant to be critical, and is only provided for transparency.
The work necessary to keep the distribution compact is ongoing.

<!-- #WORK : this is no longer true... yay! -->

Twice during boot, at initial kernel load and initramfs decompression, GaryOS
can appear to hang as the kernel and initramfs are loaded into memory.  This is
normal, and only takes a few moments each.  It uses the standard Linux
infrastructure which does not display any progress.  The actual boot time is
just as fast as other live systems, but the lack of output can be unnerving.
Thus, the final requirement is a tad bit of patience.

### Contact + Support ##########################################################
[Contact + Support]: #Contact_+_Support

[Gary B. Genett] is the sole developer and maintainer of GaryOS.  It is
a personal project with aspirations of recognition as an actual distribution,
however misguided.

There is no documentation other than this file and the usage output of the
build scripts.  The uses outlined in the [Instructions] section are the
official "happy paths", and are tested and supported.

Typing `make` or `make usage` will display the supported uses of the build
system.  Advanced uses are documented with `make help`, and are also supported
(but should only be used by those who know what they are doing).  When
reporting issues with the build system, please include the `_gentoo.log` file
from the `build` directory.

While there appears to be some adoption of GaryOS, it is not yet enough to
warrant a formal issue tracker.  For any issues, please contact the author
directly at: [gary-os@garybgenett.net]

GaryOS is very flexible, and both the kernel and build system can be used for
a wide range of applications.  Other uses of all the GaryOS tooling are
encouraged, and the author would be glad to hear about any unique or creative
ways they are employed.  For some ideas, check out the
"[gentoo/sets/\_gary-os]" package set, which outlines some of the author's
personal uses along with the steps used to test and validate GaryOS each
release.

The author will also take you out on the town if you schedule time to geek out
with him in the Seattle area.

## Project #####################################################################
[Project]: #Project

### Acknowledgements + Reviews #################################################
[Acknowledgements + Reviews]: #Acknowledgements_+_Reviews

GaryOS has maintained a [steady stream of overall downloads] since its
inception in 2014.  Activity is concentrated in the U.S. and Europe, but there
is clearly a worldwide audience, with interest coming from [countries all over
the world].  Current [v4.0 downloads] are being tracked since [v4.0] was
released in December 2019.  As of November 2019, GaryOS maintained an average
of 10-15 [v3.0 downloads] a month since the [v3.0] release in March 2015.
There are notable spikes in the overall downloads of ~2K, ~0.6K and ~1.9K in
March 2018, January 2019 and September 2019, respectively, which were most
likely fetches of supporting files.  The SourceForge statistics are not
granular enough to investigate.

Despite the relatively small user base, modest infrastructure, and infrequent
release schedule, GaryOS has managed to receive some official acknowledgment.
Most notably, it has been included in the [Gentoo family tree] and listed on
the [Funtoo ecosystem page].

![Gentoo Ecosystem](projects/gary-os/archive/gentoo-18_01_svg.png "Gentoo Ecosystem")
*Source: <https://github.com/gentoo/gentoo-ecosystem/blob/master/gentoo-18.01.svg>*

No entries in the [Wikipedia list of Linux distributions] or on [DistroWatch] yet...

There is a [Softpedia review of v3.0] from a few years ago (written the day
after it was released), which is interesting because they took the time to boot
it up and play with it, and make some comments of their own beyond doing
a copy/paste of the README text.

An [Internet search for "GaryOS"] yields a few more random mentions.  It is on
the [Wikipedia list of Gentoo-derived distributions].  By virtue of being based
on Gentoo/Funtoo, it proudly makes the list of [non-systemd distributions].

An extremely random find is a [guide to ntscript tutorial] which uses "GaryOS"
in the examples, based on that author's name.  While entertaining, there are
some very disagreeable comments made in that article.  It is only mentioned
here to make a clear statement on it if anyone else comes across it.

Snapshots of all discovered references to GaryOS are kept in the
"[artifacts/archive]" directory.  Please use [Contact + Support] to notify the
author of any other acknowledgements you may find, including you having read
this far.

[steady stream of overall downloads]: https://sourceforge.net/projects/gary-os/files/stats/timeline?dates=2014-02-28+to+2038-01-19
[countries all over the world]: https://sourceforge.net/projects/gary-os/files/stats/map?dates=2014-02-28+to+2038-01-19
[v4.0 downloads]: https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.kernel/stats/timeline?dates=2014-02-28+to+2038-01-19
[v3.0 downloads]: https://sourceforge.net/projects/gary-os/files/gary-os-v3.0-generic_64.kernel/stats/timeline?dates=2014-02-28+to+2038-01-19
[v2.0 downloads]: https://sourceforge.net/projects/gary-os/files/gary-os-v2.0-generic_64.kernel/stats/timeline?dates=2014-02-28+to+2038-01-19
[v1.1 downloads]: https://sourceforge.net/projects/gary-os/files/gary-os-v1.1-generic_64.kernel/stats/timeline?dates=2014-02-28+to+2038-01-19
[v1.0 downloads]: https://sourceforge.net/projects/gary-os/files/gary-os-v1.0-generic_64.kernel/stats/timeline?dates=2014-02-28+to+2038-01-19

[Gentoo family tree]: https://github.com/gentoo/gentoo-ecosystem
[Funtoo ecosystem page]: https://funtoo.org/Gentoo_Ecosystem
[Wikipedia list of Linux distributions]: https://en.wikipedia.org/wiki/List_of_Linux_distributions
[DistroWatch]: https://distrowatch.com/table.php?distribution=funtoo
[Softpedia review of v3.0]: https://linux.softpedia.com/get/Linux-Distributions/GaryOS-103629.shtml
[Internet search for "GaryOS"]: https://duckduckgo.com/?q=GaryOS
[Wikipedia list of Gentoo-derived distributions]: https://en.wikipedia.org/wiki/Gentoo_Linux#Derived_distributions
[non-systemd distributions]: https://sysdfree.wordpress.com/2019/03/09/135
[guide to ntscript tutorial]: https://forums.yogstation.net/index.php?threads/garys-guide-to-ntscript.14759

<!-- http://without-systemd.org/wiki/index.php/Linux_distributions_without_systemd/unlisted -->

### Contributions ##############################################################
[Contributions]: #Contributions

As much as possible, and in addition to GaryOS itself, this project tries to
give back to the community in whatever ways it can.  So far, this has
manifested as a few tiny patches to upstream projects.

**Linux Initramfs**

The "shmem" subsystem in the Linux kernel is what manages the "tmpfs"
infrastructure used for in-memory filesystems, including initramfs.  Initial
creation of the shmem filesystem reserves half of the available memory.  On
a 4GB system, this is not enough room for GaryOS to boot.  In the early history
of the "[gentoo/\_release]" script, there was a minor hack to the kernel source
to make this work the way that was needed.  For the completion of the [v4.0]
release, this was formalized as a kernel patch which also added a configuration
option and a boot parameter.  This was submitted to the Linux "mm" development
team in the following mailing list threads:

  * [Initial complete patch] -- [shmem-add-shmem_size-option-set-filesystem-size.v5.4-rc2.patch]
  * [Secondary patch, configuration option only] -- [shmem-add-shmem_size-option-for-full-filesystem.v5.4-rc2.patch]
  * [Final patch, default global variable only] -- [shmem-make-shmem-default-size-a-define-value.v5.4-rc2.patch]

All three were ultimately rejected, for good reason.  The
[shmem\_size\_hack.patch] continues to be used in GaryOS, due to the added
functionality, and is mentioned in the [Structure] and [Live Update] sections.

**Funtoo Ego**

Ego is the tool used by Funtoo to keep the "meta-repo" Portage tree up to date.
While Portage uses a monolithic directory tree, Ego uses a collection of Git
repositories pulled together using the [Funtoo Kits] infrastructure.  The
[gentoo/\_funtoo.kits] script was written to properly "pin" the final tree to
a particular commit, for stability and reproducibility.  Also for the [v4.0]
release, this hack was coded directly into the Ego tool:

  * [add-commit-option-to-ego-sync.2.7.4-r1.patch]

This was submitted upstream, but was not usable in [v4.0] because of
a mis-match in the filesystem and Ego versions.  Thus, the
[ego\_commit\_hack.patch] is in the GaryOS "[gentoo/overlay]" directory, but is
not yet in production use.  This will hopefully change in [v5.0], with the
updated Portage commit.

**Suckless DWM**

Tangentially related to GaryOS are the [DWM multimon patches] that the author
created to make multiple monitors easier to use in the DWM window manager.  The
[Suckless] team accepts these patches on their website, but due to their
minimalist philosophy contributions of this type are not committed into the
main repository, leaving users to use whatever set of patches suits them.

GaryOS does use DWM as the window manager for the [Graphical Interface], and
a slightly modified [dwm] configuration file is used for that.  It extends the
default DWM color scheme to the URxvt terminal and Links web browser, and also
makes Links the browser that is launched.  The default configuration is
otherwise unmodified, and no patches are used.

[Initial complete patch]: https://marc.info/?l=linux-mm+m=157048756423988
[Secondary patch, configuration option only]: https://marc.info/?l=linux-mm+m=157056583814243
[Final patch, default global variable only]: https://marc.info/?l=linux-mm+m=157064677005638
[Funtoo Kits]: https://www.funtoo.org/Funtoo_Kits
[DWM multimon patches]: http://dwm.suckless.org/patches/historical/multimon

<!-- https://kernel.org/doc/html/latest/process/submitting-patches.html -->
<!-- https://kernel.org/doc/html/latest/process/submit-checklist.html -->
<!-- https://funtoo.org/Development_Guide -->

### Contributing ###############################################################
[Contributing]: #Contributing

This is very much a personal project, but any contributions are welcome and
will be publicly acknowledged.  For the time being, the best way is to submit
patches using the information in [Contact + Support].  Submissions should
include the commit hash used to create the patch.

For best results, use the `git format-patch` command.  Bonus points for using
the pre-made function in the "[.bashrc]" file in the repository, like so:

  * `[...]/.bashrc git-patch [...]`

The author is passionate about who you are, your ideas and what you manifest in
the world.  All other attributes and circumstances are irrelevant
considerations here.  We are all just human beings.

It seems to be a current trend that opensource projects are adopting equality
and conduct statements.  These are the two best documents the author could
find, the latter of which was suggested by GitHub, which in turn inspired an
Internet search to find the former:

  * [Social Protection + Human Rights Equality and Non-discrimination]
  * [Contributor Covenant Code of Conduct]

Hopefully that covers all the bases.  Let's all just be kind to one another, so
we don't even need documents like these.

[Social Protection + Human Rights Equality and Non-discrimination]: https://socialprotection-humanrights.org/framework/principles/equality-and-non-discrimination
[Contributor Covenant Code of Conduct]: https://contributor-covenant.org/version/1/4/code-of-conduct.html

### Licensing + Disclaimer #####################################################
[Licensing + Disclaimer]: #Licensing_+_Disclaimer

Starting with [v4.0], GaryOS is released under the [GNU GPL v3.0].  It was
originally released under a [BSD-style license].

The author and contributors do not offer any warranty, and you take all
responsibility for your use of this software.

**Licensing**

The author shares the same passion as the GNU project for a completely open
society based on open computing platforms.  The GPL license is a very profound
statement to those ends.

However, there is also the philosophy that BSD-style licenses are yet more
permissive, and support innovation in the for-profit markets of our current
world.  The author's intent was to support this philosophy.

The switch was made for three reasons:

  1. After reviewing and considering closely the implications of each license,
     the decision was made to essentially switch the support in philosphy.  With
     intellectual property protections for source code, instead of copyrights as
     written works, in addition to software patents and the legal enforcement of
     both, the author reverted back to the "free and open society" mindset which
     first inspired his entry into the opensource world and GNU/Linux.
  2. With the [v4.0] release, patches were provided publicly to GPL licensed
     projects (see the [Contributions] section), namely the Linux kernel and
     the Funtoo distribution.  A compatible license was necessary for these
     components, and it was easier to just switch the overall license.
  3. Since the majority of the project is based on interpreted scripting
     languages, which are not compiled source, a BSD license no longer made
     sense.  It is also highly unlikely that any proprietary software will
     incorporate any aspect of this project.

For further details, see the current [License] and/or the licenses for each
release in the [Version History] section.

**Disclaimer**

Please note that both these licenses include disclaimer of warranty and
limitation of liability statements.  The statements in the licenses are the
final word on those subjects, but are summarized here as: use this software at
your own risk, because if it breaks you own all the pieces.  This is unlikely,
but the author and any contributors need to indemnify themselves.

Similar to the [Contributing] section, Hopefully we can dispense with the need
for documents and statements like these someday.

[GNU GPL v3.0]: https://www.gnu.org/licenses/gpl-3.0.html
[BSD-style license]: http://opensource.org/licenses/BSD-3-Clause

--------------------------------------------------------------------------------

# Information ##################################################################
[Information]: #Information

This collection of sections covers GaryOS and the repository in greater depth,
and is not for the faint of heart.

It is mainly here for completeness.  The most useful information is in the
[Introduction] and [Instructions] sections.

## Design ######################################################################
[Design]: #Design

GaryOS was not really "designed", per se.  It very much happened organically.
Any lack of production value to the code is a result of that.

Despite not having been designed in the traditional sense, GaryOS does have
clear structure and requirements, along with unique advantages and limitations.
It also has an interesting origin story, like all superheroes.

### Goals ######################################################################
[Goals]: #Goals

Here are the guiding principles that keep GaryOS going in a consistent
direction, with a consistent purpose.

Top requirements:

  * All-purpose, multi-OS rescue environment, based on Funtoo
  * Complete system, with all packages installed as they normally would be
  * As close to default as possible, aside from Portage package build tuning
  * Generic 64-bit build, supporting most modern x86 platforms
  * Bootable from a single kernel file, using initramfs
  * Make Funtoo installation trivial as a live media

Other objectives:

  * Support as many boot methods as possible, such as USB setup and PXE
  * Minimalist, performant Portage configuration, using only what is needed
  * Avoid non-opensource and binary licenses and packages as much as possible
  * Example configuration/scripts for tuning and maintaining a Funtoo system
  * Foster a DIY (Do It Yourself) approach through good documentation
  * Learning environment for those new to GNU/Linux or Funtoo

Explicit non-goals:

  * Growing bigger than a single kernel file
  * Customization or deep branding of overall system
  * Development of a helper scripts/commands library
  * Alteration of boot or "init" infrastructure
  * Becoming a complete desktop environment

### Advantages #################################################################
[Advantages]: #Advantages

The number of live systems, for everything from basic rescue to a full
workstation, is quite staggering.  Many of them are extremely useful and very
well-established.  So, why create another one?

The main differentiators of GaryOS:

  1. A single kernel file is easier to manage and boot than an ISO file
  2. It is a source-based Funtoo system, which is much more powerful than
     binary distributions, like those based on Debian (Grml, Ubuntu, etc.)
  3. Installation of Gentoo/Funtoo can be a bit of work, and having
     a ready-made system can make the process much more approachable

ISO files are the standard method of releasing live distributions, and they
work quite well, overall.  There are a few options for using them:

  1. Write directly to CD/DVD or USB media, each install or upgrade
  2. Use a bootloader, like Grub, which supports booting ISO images
  3. Extract the ISO contents to USB media, and configure everything manually

They do pose some challenges, however:

  1. CDs/DVDs are antiquated, and not as ubiquitous as USB drives
  2. Wiping your USB drive every upgrade makes it more or less single-purpose
  3. Booting directly from an ISO file uses an emulated CD/DVD "loop" drive
     that the OS can use, requiring a small portion of bootloader code to stay
     in memory and for the boot media to stay connected
  4. Extracting everything onto a USB drive preserves other data on the drive
     at the expense of complexity, and upgrades are not trivial

Some distributions, such as Grml, have tools that automate the process of
extracting to USB, which makes the process much simpler.  The drawback is that
these scripts require you to start from a Unix-like system to begin with, and
ultimately they manage rather than remove the complexity.

The GaryOS philosophy is that no complex steps or scripting should be
necessary.  It is a single file, and upgrades are a simple matter of replacing
it.  Once the initial bootloader is configured, it should never need to be
touched again.  GaryOS should be a resident on the media, and not the purpose
of it.  No major live distribution takes this approach or makes these claims.

### Limitations ################################################################
[Limitations]: #Limitations

Humans are not perfect, and rarely is anything we create.  While there is great
pride in GaryOS, and the care and attention to detail which goes with it, this
section is to be clear about its shortcomings.  The author wishes to avoid the
appearance of ignorance or negligence by being thoughtfully forthcoming.

General notes:

  * Lack of progress reporting while booting feels very unpolished
  * Portage configuration is tuned more for the author than a general audience

Considerations for the build system:

  * Argument processing is very rudimentary, almost archaic, and non-unique
    environment variables are used heavily for configuration
  * It is essentially just shell scripting, and all that comes with that

General coding style and syntax:

  * The coding style is organic, and not based on any standard guidelines
  * Most of the code is self-explanatory, but there are very few comments
  * Arbitrarily wide number of columns is not POSIX, and requires big monitors
  * Heavy use of tabs, for non-leading space and also mixed with standard
    spaces (a "tab stop" of "8" is required for readability)

Supportability:

  * This is a mostly personal project which the author aspires to update at
    least once a year, but there is not a copious amount of free time with
    which to support and enhance this project
  * The history for the components of this project reside in several different
    personal repositories which are merged together into the public GaryOS Git
    repository (this process is performed by the "[gentoo/\_release]" script),
    meaning that even minor disruptions or inclusion of new items will result
    in a public repository that can not use the "fast-forward" feature of Git
    and will require re-cloning

### History ####################################################################
[History]: #History

The origin of the project was experimentation with the Metro, Buildroot and
BusyBox projects, and Metro in particular.  The goal at the time was to use
Metro to build customized "stage3" files.  As development of the concept
continued, the difference between a "stage3" and a system that could be run
live began to disappear.  An inspired moment of "could the custom stage3 be
used as an initramfs?", and GaryOS was born as a relatively unique live OS.

Perusing the history of this repository and the [Download] directory will
provide pretty good visibility into those floundering beginnings.

Until [v1.1], it was still mostly a publicly-available experiment and not an
actual project fit for the masses.  That release marked a turning point where
an effort was made towards general usability.  Starting with [v2.0], releases
were made specifically to be utilized by a general audience.  Improvements were
made through [v3.0], but the project remained in an embryonic state.  Both
[v2.0] and [v3.0] were primarily driven by an update in the Portage commit used
to determine the package versions.  In particular, [v3.0] was released mostly
on the self-imposed pressure to put out another release.

In the time from 2015-2019, life took on some big changes for the author, and
GaryOS fell by the wayside.  His own personal system languished until 2017,
when an absolutely necessary update was forced as a matter of being able to
accomplish critical tasks, such as using certain websites.  Another year
whittled by, as infrequent and half-hearted investments where made until
another upgrade in 2018.  Again it took almost a year to perform an upgrade,
and also to complete the efforts towards another actual release of GaryOS.

With the [v4.0] release, a genuine effort was made to upgrade the project to
a production-grade distribution.  Despite over 4 years of release inactivity,
downloads remained consistent, and even experienced a few unexplained spikes.
The build system was switched from Metro to the one being used by the author
for his personal builds, the build system was made much more robust, all the
scripts were cleaned up and documented as much as possible, and a Makefile
was written to make the system more usable.  Tuning of the system was done on
a more granular level, and some non-intrusive branding and polish was added.
Finally, paths to live updating or installation were formalized and wrapped
using the Makefile.  Generally speaking, the final result was designed to be
less "hackish".

At that point in time, upgrades were still taking a year or more to complete.
With the updated build system and release process, work began to decrease the
time between stable builds, and continues today towards [v5.0].

The project was not named GaryOS out of any delusions of grandeur or egomania.
It was coined years before its birth by a pair of good friends who jested at
the amount of time and effort spent tuning and customizing a computing
environment.  The author's workstation was jokingly called "Gary OS".

All the heavily personalized tools, configuration and automation are made
possible by the dedicated efforts of thousands of developers worldwide who
build and maintain a plethora of opensource projects.  Since GaryOS is really
nothing more than a thin layer of wrapping and polish on the more mature work
of these projects, it seemed fitting to name the project as such in
a self-deprecating manner.

That final point is worth re-iterating: GaryOS is 95%+ the work of other
projects.  All that has been done is to tie things together in a way that some
may find novel, appealing and useful.

## Details #####################################################################
[Details]: #Details

This section outlines the key pieces which make GaryOS tick.  The work will
still pretty much speak for itself, but some explanation of what all the stuff
in this repository is will likely be beneficial to anyone curious enough to
have read this far.

Most of what is needed to use the contents of this repository is contained in
the [Structure] section.

### Versioning #################################################################
[Versioning]: #Versioning

Release version numbers are assigned in the spirit of [Semantic Versioning].
However, GaryOS does not provide any APIs, so the full specification does not
apply.  As such, the model used is to update the major version number whenever
the Portage commit is updated.  Minor version numbers are done for updates to
a particular Portage commit as a new release.

A notable exception was [v1.0].  The reason being that was the first version
released as a single kernel file and meant for general use.  The [v1.1] release
was a continuation of that work.  Starting with [v2.0], GaryOS will adhere to
the major/minor system, where each major is a new Portage tree and each minor
is just an update on that same tree.

Major revisions to the GaryOS build system and supporting scripting and
configuration files will also line up with major version numbers.

[Semantic Versioning]: https://semver.org

### Structure ##################################################################
[Structure]: #Structure

Here is an overview of the repository contents, in order of relative importance:

| Directory / File           | Purpose
|:---                        |:---
| [README.md]                | This file.  All the documentation for GaryOS.
| [LICENSE.md]               | The license GaryOS is distributed under.
| [Makefile]                 | Primary starting point for using the build system using the `make` command.
| [packages.txt]             | Final package list, including sizes and markers for what is installed versus packaged for the build.
| [\_commit]                 | Solely for author tracking.  Records commit IDs for each of the repositories relevant to the building of GaryOS.
| **Key directories:**       | --
| [linux]                    | Archive of Linux kernel configuration files.
| [gentoo]                   | Entirety of the Funtoo configuration, including the scripts used to build and manage installations.
| [gentoo/overlay]           | Funtoo overlay directory.  Used very sparingly, and mostly for fixing broken packages.
| [scripts]                  | Ancillary scripts relevant to GaryOS, such as "[scripts/grub.sh]".
| [artifacts]                | Storage for miscellaneous files used in the initramfs build.
| [artifacts/patches]        | Archive of patch files for preparing initramfs images.
| [artifacts/images]         | Icons, screenshots and the like.
| [artifacts/archive]        | Stash space for files which don't fit elsewhere, including snapshots of [Acknowledgements + Reviews] items.
| **Core files:**            | --
| [.bashrc]                  | Custom Bash configuration file.  Included as an essential scripting library.
| [scripts/grub.sh]          | Generates the [Grub] archive, which contains BIOS and EFI rescue bootloaders, along with a prepared disk image.
| [gentoo/\_system]          | Heart and soul of the build engine.  Creates new installations, and provides maintenance and inspection tooling.
| [gentoo/\_release]         | Does all the initramfs work, customizing and packaging the root filesystem and building the kernel.  Also performs the entire release and publishing process.
| [gentoo/\_funtoo]          | Contains the commit ID that the Funtoo Portage repository should be "pinned" to.  Ties the Funtoo configuration to a particular version of the Portage tree, which ensures repeatability and stability.
| [gentoo/\_funtoo.kits]     | Hackish wrapper to the `meta-repo` Portage repository, to ensure proper "pinning".  *(The [ego\_commit\_hack.patch] is a replacement, but currently usused due to a version conflict.  See [Contributions] section.)*
| [gentoo.config]            | Example script for post-build customization of an initramfs.
| [gentoo/.emergent]         | Audit script which validates current Funtoo configuration against Portage tools/output.  Also extracts useful information from the `meta-repo` Portage repository.
| [dwm]                      | Slightly modified DWM configuration file, to make `startx` more usable.
| [gentoo/sets/gary-os]      | Package list for initramfs build.  Also contains custom keywords for tailoring the build.
| [gentoo/sets/\_gary-os]    | Additional packages list, along with scripting instructions/commands for accomplishing various tasks and testing GaryOS.
| [shmem\_size\_hack.patch]  | Kernel code changes to set the initramfs size in memory and add the "shmem_size" parameter.  Both of these changes were understandably rejected by Linux development team, and are therefore custom to GaryOS.  *(See the [Contributions] and [Live Update] sections for details.)*
| **Just for fun:**          | --
| [.vimrc]                   | Vim is a pretty critical tool for the author, and this is just to keep a copy of the configuration file handy.  This is also the only place it is published online, and hopefully it is useful to somebody.
| [xclock\_size\_hack.patch] | The author wanted "[gkrellaclock]" to look more like a genuine "xclock", so he did it.  First real experience coding in C.  Created in early 2012 and still in active use.

[README.md]: https://github.com/garybgenett/gary-os/blob/master/README.md
[LICENSE.md]: https://github.com/garybgenett/gary-os/blob/master/LICENSE.md
[Makefile]: https://github.com/garybgenett/gary-os/blob/master/Makefile
[packages.txt]: https://github.com/garybgenett/gary-os/blob/master/packages.txt
[\_commit]: https://github.com/garybgenett/gary-os/blob/master/_commit

[linux]: https://github.com/garybgenett/gary-os/blob/master/linux
[gentoo]: https://github.com/garybgenett/gary-os/blob/master/gentoo
[gentoo/overlay]: https://github.com/garybgenett/gary-os/blob/master/gentoo/overlay
[scripts]: https://github.com/garybgenett/gary-os/blob/master/scripts
[artifacts]: https://github.com/garybgenett/gary-os/blob/master/artifacts
[artifacts/patches]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches
[artifacts/images]: https://github.com/garybgenett/gary-os/blob/master/artifacts/images
[artifacts/archive]: https://github.com/garybgenett/gary-os/blob/master/artifacts/archive

[.bashrc]: https://github.com/garybgenett/gary-os/blob/master/.bashrc
[scripts/grub.sh]: https://github.com/garybgenett/gary-os/blob/master/scripts/grub.sh
[gentoo/\_system]: https://github.com/garybgenett/gary-os/blob/master/gentoo/_system
[gentoo/\_release]: https://github.com/garybgenett/gary-os/blob/master/gentoo/_release
[gentoo/\_funtoo]: https://github.com/garybgenett/gary-os/blob/master/gentoo/\_funtoo
[gentoo/\_funtoo.kits]: https://github.com/garybgenett/gary-os/blob/master/gentoo/\_funtoo.kits
[gentoo.config]: https://github.com/garybgenett/gary-os/blob/master/gentoo.config
[gentoo/.emergent]: https://github.com/garybgenett/gary-os/blob/master/gentoo/.emergent
[dwm]: https://github.com/garybgenett/gary-os/blob/master/gentoo/savedconfig/x11-wm/dwm
[gentoo/sets/gary-os]: https://github.com/garybgenett/gary-os/blob/master/gentoo/sets/gary-os
[gentoo/sets/\_gary-os]: https://github.com/garybgenett/gary-os/blob/master/gentoo/sets/_gary-os

[ego\_commit\_hack.patch]: https://github.com/garybgenett/gary-os/blob/master/gentoo/overlay/app-admin/ego/files/add-commit-option-to-ego-sync.2.7.4-r1.patch
[Ego "commit" patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/add-commit-option-to-ego-sync.2.7.4-r1.patch
[add-commit-option-to-ego-sync.2.7.4-r1.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/add-commit-option-to-ego-sync.2.7.4-r1.patch

[shmem\_size\_hack.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/shmem-add-shmem_size-option-set-filesystem-size.v4.18-rc6.patch
[shmem-add-shmem_size-option-set-filesystem-size.v4.18-rc6.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/shmem-add-shmem_size-option-set-filesystem-size.v4.18-rc6.patch
[shmem-add-shmem_size-option-set-filesystem-size.v5.4-rc2.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/shmem-add-shmem_size-option-set-filesystem-size.v5.4-rc2.patch
[shmem-add-shmem_size-option-for-full-filesystem.v5.4-rc2.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/shmem-add-shmem_size-option-for-full-filesystem.v5.4-rc2.patch
[shmem-make-shmem-default-size-a-define-value.v5.4-rc2.patch]: https://github.com/garybgenett/gary-os/blob/master/artifacts/patches/shmem-make-shmem-default-size-a-define-value.v5.4-rc2.patch

[.vimrc]: https://github.com/garybgenett/gary-os/blob/master/.vimrc
[gkrellaclock]: https://github.com/garybgenett/gary-os/blob/master/gentoo/overlay/x11-plugins/gkrellaclock
[xclock\_size\_hack.patch]: https://github.com/garybgenett/gary-os/blob/master/gentoo/overlay/x11-plugins/gkrellaclock/files/xclock_size_hack.patch

### Tools ######################################################################
[Tools]: #Tools

This is a list of the primary tools and sites which are used to build and
distribute GaryOS.  Additional honorable mentions are in [Ecosystem].

First and foremost, the projects which brought opensource into the mainstream
need to be recognized:

  * GNU (GNU's Not Unix): <https://gnu.org>
  * GNU/Linux: <https://gnu.org/gnu/linux-and-gnu.html>
  * Linux: <https://linuxfoundation.org> -- <https://kernel.org>

All the real heavy-lifting is accomplished using these tools/projects:

  * Funtoo + Ego: <https://funtoo.org> -- <https://funtoo.org/Package:Ego>
  * Gentoo + Portage: <https://gentoo.org> -- <https://wiki.gentoo.org/wiki/Portage>
  * Linux initramfs: <https://kernel.org/doc/Documentation/filesystems/ramfs-rootfs-initramfs.txt>
  * GNU Grub: <https://gnu.org/software/grub>

Kernel configuration, package lists and acknowledgments to:

  * Grml: <https://grml.org>
  * SystemRescueCd: <http://www.system-rescue-cd.org>

Special thanks to the sites which made worldwide distribution possible:

  * SourceForge: <https://sourceforge.net>
  * GitHub: <https://github.com>

GitHub was instrumental in inspiring the author to publish this project, but
SourceForge provided the distribution platform which made it possible to reach
an international audience overnight.

### Ecosystem ##################################################################
[Ecosystem]: #Ecosystem

Beyond the [Tools] used to create and publish GaryOS, there is a small universe
of projects that either provided inspiration, see some use within GaryOS, or
are related projects that need to be pointed out.

To start, homage must be paid to those who started it all (at least, these are
the ones which the author used most over the years, after discovering tomsrtbt
in 1998):

  * tomsrtbt: <http://www.toms.net/rb>
  * KNOPPIX: <https://knopper.net/knoppix>
  * Debian Live: <https://debian.org/devel/debian-live>

Inspiration was provided by:

<!--
#WORK: busybox is now also a core component
#WORK: same with squashfs
-->

  * Metro: <https://funtoo.org/Metro_Quick_Start_Tutorial>
  * Buildroot: <https://buildroot.org>
  * BusyBox: <https://busybox.net>
  * StaticPerl: <http://software.schmorp.de/pkg/App-Staticperl.html>

There are also a few projects which are relied on for critical tasks or highly
visible components, and deserve mention:

  * Rufus: <https://rufus.ie>
  * Vim: <https://www.vim.org>
  * Git: <https://git-scm.com>
  * Qemu: <https://qemu.org>
  * Suckless: <https://suckless.org>
  * Links: <http://links.twibright.com>

[Rufus]: https://rufus.ie
[Vim]: https://www.vim.org
[Git]: https://git-scm.com
[Qemu]: https://qemu.org
[Suckless]: https://suckless.org
[Links]: http://links.twibright.com

It should be noted, with additional emphasis, the critical role tomsrtbt played
in the course of the author's career, and his sustained mentality towards the
malleability of GNU/Linux and its power and flexibility as a "run anywhere,
anyhow" computing environment.

--------------------------------------------------------------------------------

# Instructions #################################################################
[Instructions]: #Instructions

The following sections are intended to be the HOWTO documentation for using
various aspects of GaryOS.  They are the primary use cases that have been
considered and tested.

These are fully supported, and are verified each release.  Each section
contains the validation details, and the [Release Process + Checklist] section
has further information about the testing done.

## Booting #####################################################################
[Booting]: #Booting

These sections cover the various ways of booting GaryOS into a running system.

### Boot Methods ###############################################################
[Boot Methods]: #Boot_Methods

<!--
#WORKING
#WORK : packdirs notes in intro/size section; new limit on the size of the kernel in grub? == ~350mb
-->

[Grub Rescue]

[Using Linux]

[Using Windows]

[EFI]

[PXE]

<!--
#WORKING
#WORK : shmem\_size= + groot= -> /.groot/.groot -> /.overlay
-->

### Grub Rescue ################################################################
[Grub Rescue]: #Grub_Rescue

|:---|:---|
| **Description** | -- GaryOS requires some form of bootable media to load from, such as a hard disk or USB drive. \
                    -- To support this, a custom Grub bootloader image is created by the "[scripts/grub.sh]" script.  This image is a near-complete Grub rescue environment that can be loaded without requiring any additional files from disk.
| **Resources**   | -- List of Grub modules and what they are: <https://linux.org/threads/understanding-the-various-grub-modules.11142> \
                    -- #WORK usb drive instructions, using grub.sh (merge with grub section below?) \
                    -- #WORK new options/help and menu search feature... add to version history highlights \
                    -- #WORK hybrid mbr notes?  automate in grub.sh?  yes... script out creation of a blank usb drive \
                    -- *More about hybrid partition tables: <http://rodsbooks.com/gdisk/hybrid.html>* \
                    -- #WORK \
                    -- custom menu gary-os.grub.cfg \
                    -- secure boot \
                    -- null kernel = was that just a fluke?  test laptop again...
| **Versions**    | -- Grub: sys-boot/grub-2.02-r1 \
                    -- Rufus: v3.7

<!--	#WORK ~350m grub limit for size, and keeping under ~4gb ram -->

There are three supported methods for getting this image installed to a USB
drive or hard disk, in order of preference and supportability:

  1. Use an existing Linux-compatible bootloader on a USB drive or hard disk
  2. From Windows or Linux, use the prepared disk image to overwrite and format
     a USB drive
  3. From Linux, use the "[scripts/grub.sh]" script to overwrite and format
     a USB drive
  4. From Linux, use the "[scripts/grub.sh]" script to install the bootloader
     to an already formatted USB drive or hard disk

The second option is the only way to prepare a USB drive from within Windows,
and is for cases where you want to create a rescue USB drive and/or dual-boot
Linux without having to reformat your hard drive and reinstall Windows.

**1. Existing Bootloader**

If you already have a Linux-compatible bootloader installed, all you need to do is point to the [Kernel] on whatever hard disk or USB drive is being used whatever hard disk or USB drive is being used.  Reference it as a normal Linux kernel, and no kernel options or initrd files are needed.

If you are using Grub as your bootloader, it is as simple as something like this:

<!--	#WORK: boot.kernel? -->
	menuentry "GaryOS" {
		linux  (hd0,1)/gary-os/gary-os.boot.kernel
		linux  (hd0,1)/gary-os/gary-os.kernel
	}

Setting this up for other bootloaders is left as an exercise for the reader.

<!--
#WORKING

#WORK: use the "grub.cfg" file?
#WORK: manual, direct "linux" entry (gary-os.boot.kernel, too?)
-->

| Partition | Start Sector | End Sector | Size       | Code | Name
|---:       |---:          |---:        |---:        |---:  |:---
|  1        | 2363392      | 7275923    |    2.3 GiB | 0700 | Microsoft basic data
| 98        |  266240      | 2363391    | 1024.0 MiB | EF00 | EFI System
| 99        |    4096      |  266239    |  128.0 MiB | EF02 | BIOS boot partition

**2.a. Prepared Image (Windows)**

	rufus instructions || ctrl+r = compmgmt.msc / diskmgmt.msc -> ctrl+x = Disk Management -> search box = disk management = "Create and format hard disk partitions"
		anything 4gb or greater
		right click zip -> extract all (select same folder it is in, such as desktop)
		rufus (yes, allow, if it asks)
		skip the update
		select usb drive (may need advanced drive options -> List USB Hard Drives) -> screenshot?
		select loopfile.img image
		start (yes, destroy! = careful!)
		diskmgmt -> erase last partition and create new
		gary-os/gary-os.grub.cfg
		gary-os/gary-os.kernel
		ready to go!

**2.b. Prepared Image (Linux)**

<!--	#WORK -->
	usage: grub.sh {directory} [options]
	{directory}             target directory to use for building grub files (must already exist)
	[-d || -d<0-9+>]        show debug information || number of objects to list (default: 10)
	[-f || -fx]             format the target block device || use ext4 instead of vfat/exfat
	[block device]          use target device instead of the example loopfile
	        (loopfile):     [...]/loopfile.img
	        grub<0-9+>      alternate partition number for example loopfile (default: 1)
	        /dev/sda        use specified device with standard data partition (default: 1)
	        /dev/sda<0-9+>  custom data partition number
	[kernel options]        additional custom options to pass to the kernel at boot

  * [Release Process + Checklist]

**3. Format With Script**

**4. Install With Script**

**Grub Rescue**

For convenience and supportability, this case has also been automated in
the `grub.sh` script.  The `gary-os.grub.*` file in the root download
directory contains an archive of the output of this script.  However,
for this case the script will need to be run locally.  The [Windows
Dual-Boot] section above has more details on the `grub.sh` script and
its usage and output.

Instructions for Grub "rescue" image installation to hard disk:

  1. Create an empty working directory:
     * e.g. `mkdir /tmp/grub`
  2. Change into the working directory:
     * e.g. `cd /tmp/grub`
  3. Run the `grub.sh` script with a block device argument:
     * e.g. `grub.sh /dev/sda`
  4. The script will create necessary files in the working directory,
     and then uses `grub-bios-setup` to install the custom-built
     "core.img" into the boot record.
  5. The block device can now be booted directly into a Grub environment
     which does not require any access to disk for its modules or
     configuration.
     * **The working directory is no longer needed and can be deleted.**
  6. To remove, simply re-install Grub using `grub-install` as usual, or
     install another bootloader.

### Using Linux ################################################################
[Using Linux]: #Using_Linux

<!--	#WORKING -->

### Using Windows ##############################################################
[Using Windows]: #Using_Windows

<!--	#WORKING -->

  * Definition:
    * Boot using the native Windows bootloader
    * No modifications to the hard drive partitions or boot records
    * Do not require any files outside of `C:` in the Windows
      installation
  * Last tested with:
    * GaryOS v3.0
    * MBR/GPT only; EFI not built or tested
    * Windows 7 Ultimate SP1 64-bit
    * Grub: sys-boot/grub-2.02_beta2-r3
  * Research and development:
    * <http://lists.gnu.org/archive/html/help-grub/2013-08/msg00005.html>
        * <http://blog.mudy.info/2010/08/boot-grub2-stage2-directly-from-windows-bootmgr-with-grub4dos-stage1>
    * <https://wiki.archlinux.org/index.php/Windows_and_Arch_Dual_Boot#Using_Windows_boot_loader>
        * <http://iceflatline.com/2009/09/how-to-dual-boot-windows-7-and-linux-using-bcdedit>

For convenience and supportability, this case has been mostly automated
in the `grub.sh` script.  The `gary-os.grub.*` file in the root download
directory contains an archive of the output of this script.

Overview of the script:

  * When run without arguments, it creates a series of Grub images and
    configuration files in the current directory.
  * When run with a single block device argument, the target device will
    be used for installation of the "rescue" Grub image, rather than the
    example disk image file.

Overview of the output:

  * `bcdedit.bat`
    * Used to install/remove the necessary entries from the Windows
      bootloader database.
  * `bootstrap.*`
    * Grub "core.img" and configuration loaded from the Windows
      bootloader.  Uses the directory added to `C:` (instructions below)
      for modules (such as `i386-pc` directory) and menu configuration.
  * `grub.cfg`
    * Grub menu used by "bootstrap" above.  Can be modified as needed to
      boot other OSes/objects.
<!--
	#WORK: note about `*.efi` files recently added...
	#WORK: add use-case for Mac OSX booting with rEFInd
	#WORK: no mac os x, won't boot linux
-->
  * `rescue.*`
    * Grub "core.img" rescue environment detailed further in [Grub
      Rescue] section below.
  * `rescue_example.raw`
    * Hard disk image file example of installation of Grub "rescue"
      environment.

Instructions for Windows bootloader dual-boot:

  1. The script assumes a default installation, with a small boot
     partition as partition 1 and Windows `C:` on partition 2.  All
     other partitions must be 3 or higher.  Configurations that do not
     match this will require minor edits to the script, and a fresh
     build of the output directory.
  2. Copy the output directory to `C:\gary-os.grub`, or wherever the
     script has been modified to point to.
  3. Run the `bcdedit.bat` script as Administrator (using the left-click menu).
     Running this script without Administrator privileges can cause unexpected
     and/or undesired results.  The `bcdedit.guid.txt` file that is created is
     necessary for automatic removal of the created boot entry.
  4. Place the GaryOS files at these locations:
     * `C:\gary-os-64.kernel`
     * `C:\gary-os-32.kernel`
  5. Use the new option in the Windows bootloader to switch to Grub and
     boot GaryOS (or other OSes/objects bootable by Grub).  Doing
     nothing will boot into Windows as usual.
  6. Simply update the GaryOS files in-place to upgrade.
  7. Run the `bcdedit.bat` script as Administrator to remove from the
     Windows bootloader configuration.  The directory and files created
     in `C:` need to be removed manually.

If the `bcdedit.guid.txt` file is lost, or otherwise becomes out of
date with the bootloader database, use the `bcdedit` command as
Administrator to remove the unwanted entries:

  1. Run `cmd` as Administrator.
  2. Run `bcdedit` to view the bootloader database.  Copy the
     `identifier` field for each GaryOS entry.
  3. Run `bcdedit /delete {identifier} /cleanup` for each entry.  Note
     that the `{identifier}` should be replaced with the full string
     output in #2 above, including the `{}` markers.
     * e.g. `bcdedit /delete {02a0fce9-68f5-11e3-aa07-e94d28b95f82}
       /cleanup`

### EFI ########################################################################
[EFI]: #EFI

|:---|:---|
| **Description** | -- Use the Linux EFI stub to boot GaryOS directly as an EFI application, without the need for a bootloader.
| **Resources**   | -- <https://wiki.archlinux.org/index.php/EFISTUB#Booting_EFISTUB>
| **Versions**    | -- (This is a Linux kernel native feature, and has been enabled in GaryOS) \
                    -- EFI Boot Manager: sys-boot/efibootmgr-15

<!--
#WORK: needs testing

#WORKING
-->

With some modification of the Funtoo configuration and package list, the build
system can be used to create a lab workstation or other automated environment
where machines can be spontaneously set up and then completely wiped and reset
with a simple reboot.

### PXE ########################################################################
[PXE]: #PXE

|:---|:---|
| **Description** | -- Boot directly from a network card using a PXE server hosting GaryOS.
| **Resources**   | -- <https://linuxconfig.org/network-booting-with-linux-pxe>
| **Versions**    | -- DHCPd: net-misc/dhcp-4.3.6_p1 \
                  | -- TFTPd: net-ftp/tftp-hpa-5.2-r1 \
                  | -- Qemu: app-emulation/qemu-3.0.0 \
                  | -- iPXE: sys-firmware/ipxe-1.0.0_p20180211

With some modification of the Funtoo configuration and package list, the build
system can be used to create a lab workstation or other automated environment
where machines can be spontaneously set up and then completely wiped and reset
with a simple reboot.

Once you have a functioning PXE environment, on a global or per-host basis add
the following configuration option to `dhcpd.conf`:

  * `filename "gary-os-[...].kernel";`

The "Resources" links in the table above have further instructions on
configuring a PXE environment suitable for booting Linux.

<!--
#WORK now supports options and the whole rootfs infrastructure
#WORK documented example in dhcpd.conf+spider
-->

## Running #####################################################################
[Running]: #Running

There are few tasks you may wish to perform once GaryOS is booted and running.
Some examples are setting up networking or running the graphical interface.

### Primary Uses ###############################################################
[Primary Uses]: #Primary_Uses

<!-- #WORKING -->

|:---|:---|
| **Description** | -- Use GaryOS to examine a system and hard drives from a completely read-only "clean room" environment
                  | -- Repair failed systems or recover data from failed hard drives
                    -- To support this, a custom Grub bootloader image is created by the "[scripts/grub.sh]" script.  This image is a near-complete Grub rescue environment that can be loaded without requiring any additional files from disk.
| **Resources**   | -- List of all the kernel parameters: <https://www.kernel.org/doc/html/v4.18/admin-guide/kernel-parameters.html> \
| **Versions**    | -- (The options are native to the Linux kernel native feature, and has been enabled in GaryOS) \

<!--
	#WORKING
	* #WORK: eliminate
-->

  * Definition:
    * Boot into a completely "clean" environment, so that diagnostics
      and/or recovery can be done in a read-only manner
  * Last tested with:
    * GaryOS v3.0

<!--
	#WORK only two daemons running (Udev and SSH)
	#WORK Once booted, the entire system resides in memory.
-->

GaryOS is in a forensics mode by default.  Hardware scanning is
performed, but the hard drives are not mounted or otherwise touched.
All entries in `/etc/fstab` have been commented out.  As a result, swap
is also disabled.

Linux kernel options can further be used to disable hardware scanning
and interrogation.

It is a stated goal that forensics mode continue being the default.

<!--
	#WORK suspend to ram capability
	#WORK packages.txt
	#WORK make unpack : supports packs within packs, but packs within packs within packs will not work as expected
	#WORK ~350m grub limit for size, and keeping under ~4gb ram
-->

### Networking Configuration ###################################################
[Networking Configuration]: #Networking_Configuration

<!--	#WORKING -->
  * Definition:
    * Configure networking, either wired or wireless
  * Last tested with:
    * GaryOS v3.0

No networking configuration or daemons are run by default, but several
networking packages are installed to ease on-the-fly setup.

For simple DHCP, the `dhcpcd` command can be run directly on the desired
interface, such as an Ethernet connection:

<!--
	#WORK ??? use only `rc-update add dhcpcd default ; rc` ??? make this work with wpa_cli
	#WORK now set up by default!  only need instructions for wpa_cli if wireless...  must still do the rc-update adds
	#WORK netmount is disabled... no networking... not even sshd... remove sshd from above!
	#WORK https://wiki.gentoo.org/wiki/Network_management_using_DHCPCD
-->

https://wiki.gentoo.org/wiki/Wpa_supplicant#Using_wpa_cli
https://wiki.archlinux.org/index.php/WPA_supplicant#Connecting_with_wpa_cli
https://wireless.wiki.kernel.org/en/users/drivers/mac80211_hwsim

<!--
	#WORK vi /etc/wpa_supplicant/wpa_supplicant.conf
	#WORK `wpa_password "<ssid>" "<password>" > /etc/wpa_supplicant/wpa_supplicant.conf`
	#WORK Add `ssid_scan=1` to `/etc/wpa_supplicant/wpa_supplicant.conf`
	#WORK `rc-update add wpa_supplicant default ; rc`

	#WORK get rid of "networkmanager" and "nmcli" commands; use "iwconfig/iwlist" instead... nmtui?
	#WORK (ha! all the below text is actually starting to look pretty good... maybe just test it once more...)

	#WORK commands for wpa_cli, no more networkmanager
-->

  * `dhcpcd eth0`

A more formal way of doing this would be to use the OpenRC scripts:

  * `rc-update add dhcpcd default ; rc`

For wireless networking, the NetworkManager package is available to
simplify the configuration:

	rc-update add wpa_supplicant default
	rc-update add dhcpcd default
	openrc

Wireless networks can then be scanned and configured:

<!-- #WORK: automate this in a script or make command? == ./script.sh (parsed list) = number select = read -s(?) psk -->

	wpa_cli

	ap_scan 1
	scan
	scan_results
	add_network
	list_networks
	set_network 0 scan_ssid 1
	set_network 0 ssid "Unknown Network"
	set_network 0 psk "onthenetwork"
	enable_network 0

	select_network 0
	status
	save_config

The Funtoo OpenRC scripts have all sorts of advanced networking features and
options, covered in depth:
<!-- #WORK: verify link -->
<https://funtoo.org/Networking>

### Graphical Interface ########################################################
[Graphical Interface]: #Graphical_Interface

<!--
	#WORKING
	#WORK standardize the name (X.Org/Xorg) and details (GUI/graphical) here and in /etc/issue
	#WORK https://wiki.gentoo.org/wiki/Dwm
	#WORK is just a simple "startx" now
	#WORK title bar pointer, and elinks menu click
	#WORK readme = left click or Alt+Left / man dwm = right click or Alt+Right
	#WORK xrandr --query
	#WORK xrandr --output Virtual-0 --mode 1920x1200
	#WORK https://wiki.archlinux.org/index.php/QEMU#SPICE
	#WORK	/etc/init.d/spice-vdagent start
	#WORK	spice-vdagent
	#WORK	running arandr
	#WORK	running netsurf
-->

  * Definition:
    * Start up and use the X.Org GUI environment
  * Last tested with:
    * GaryOS v3.0

GaryOS boots to CLI (Command-Line Interface) by default.  To enter the
graphical interface, run `startx`.

<!--	#WORK nomodeset is not required anymore -->
The Linux kernel includes driver modules for many common video cards,
but to keep the size of GaryOS down the X.Org installation only includes
the VESA driver (which almost all modern video cards support).  If the
kernel driver for a video card is loaded at boot, it will prevent X.Org
from taking over.  If you plan to run the graphical interface, use the
`nomodeset` kernel option when booting to prevent Linux from loading any
video card drivers.

By default, the DWM window manager is used.  URxvt is the default
terminal emulator, and Surf is the default browser.  Both are wrapped
using the Tabbed utility.

Keyboard shortcuts:

  * Use `ALT-SHIFT-ENTER` to launch terminal emulator.
  * Use `ALT-CTRL-ENTER` to launch web browser.

More information:

  * Read `man dwm` for help on the window manager.
  * Read `man tabbed` for help on the tabbing utility.
  * Read `man urxvt` for help on the terminal emulator.
  * Read `man surf` for help on the web browser.

<!--
	#WORK: not all suckless now!  note the "netsurf-fb" browser as an option...
	#WORK: not all suckless now!  kudos to the "links" browser...
	#WORK: dwm patches in [Contributions] section
-->

<!-- #WORK: still need this? -->
Thanks to the [Suckless] team for creating such lightweight and useful
software.

## Building ####################################################################
[Building]: #Building

In addition to being a live GNU/Linux system, GaryOS is also the build system
used to produce itself.  The system can also be used to create new installations
from scratch, or install GaryOS directly from memory to disk.

Another important feature is the ability to update the system while it is
running live, including installing new packages.

### Live Update ################################################################
[Live Update]: #Live_Update

<!--
	#WORKING
	#WORK: ramfs size kernel option (shmem_size=), will be 50% up to 4g
	#WORK: see "gary-os" sets file
	#WORK: minimum memory to boot: ???
	#WORK: recommended memory to live update: ???

	#WORK: instructions here or in gary-os sets file?  would probably be best to move those to here... ditch the sshfs madness, or keep there as personal insructions (from usb is probably better)?
	#WORK: mount -o remount,size=6g /
	#WORK: following tars may need the files copied if linux.tar.xz is too huge to make the initramfs
	#WORK: tar -vvx -C /var/git -f /var/git/meta-repo.tar.xz
	#WORK: tar -xvv -C /usr/src -f /usr/src/linux.tar.xz
	#WORK: create a "make open" target to do the untars... document both in here and there...
	#WORK: unpack -> PACK_DIRS! --> touchfile or mkdir or symlink[unbroken] (need to outline the difference, and the "edit" option <with "="> for a touchfile)
	#WORK: note about firmware files (others?) and keeping handy on usb drive (make fetch)
	#WORK ~350m grub limit for size, and keeping under ~4gb ram

	#WORK: seems to work, but only without ccache?
	#WORK: mount -o remount,size=3g /.overlay
	#WORK
	# cat /proc/meminfo
	# MemTotal:       32886576 kB
	# MemFree:          328308 kB
	# MemAvailable:   30031552 kB
	#WORK
-->

  * Definition:
    * Update/install packages using Funtoo tools
  * Last tested with:
    * GaryOS v3.0, with 8GB memory

A complete Funtoo environment is available.  In order to install/update
packages, a couple of missing items need to be put into place.  A surprising
number of packages can be installed without filling up the in-memory
filesystem.

Instructions for setting up update/install of packages:

  1. Install Portage tree.
     * **Option 1:** Synchronize tree as usual.
         * `emerge --sync`
     * **Option 2:** Download `portage-*` archive from one of the `v#.#`
       version download directories; preferably from the one which
       matches your version of GaryOS.  This option is best if you plan
       to keep this file on the same media along side the GaryOS kernel
       file(s).  To extract:
         * `tar -pvvxJ -C /usr -f portage-[...].tar.xz`
     * Generally speaking, "Option 1" is a smaller/faster download than
       "Option 2".  However, "Option 2" has the benefit of offline
       access, and may be simpler to update from since it is at the same
       revision of the tree that was used to build that version of
       GaryOS.
<!--	#WORK: hacks no longer needed... -->
  2. Perform minor hacks to get working in a RAMdisk environment.  These
     should **NOT** be done if planning to install to disk per the
     [Installation] section below.  They essentially disable available
     space checks, since the Portage scripts expect to be using
     a physical disk.  Commands to run:
     * ...

       ```
       sed -i "s%has_space = False%has_space = True%g" \
            /usr/lib/portage/pym/portage/package/ebuild/fetch.py
       ```
<!--	#WORK: first is no longer needed, but keep this one as a fallback for packages like firefox or thunderbird... -->
     * `alias emerge="I_KNOW_WHAT_I_AM_DOING=true emerge"`
         * For details, see `"There is NOT at least"` in
           `/usr/portage/eclass/check-reqs.eclass`
  3. Make desired edits to `/etc/portage` configuration.
     * In particular, to complete configuration of the X.Org GUI the
       `INPUT_DEVICES` and `VIDEO_CARDS` variables should be properly
       configured.
<!--	#WORK: this is now done by just using the [\_gary-os] package set, or a new, custom one... also, no more metro... -->
     * Starting with `bindist`, there is a list of negated `-*` options
       at the end of the `USE` list which are necessary to build GaryOS
       via Metro.  All of these can/should be removed to get the full
       non-Metro configuration.
  4. Use all Portage commands as usual.
     * e.g. `emerge firefox`

### Custom Builds ##############################################################
[Custom Builds]: #Custom_Builds

<!--
	* #WORKING
	* [Rootfs]
	* #WORK NEW build-within-the-build = on-disk and in-system
	* #WORK: https://downloads.sourceforge.net/project/gary-os/v3.0/stage3-core2_64-funtoo-stable-2015-01-27.tar.xz
	* #WORK: does not install expect, so may need to hit enter a few times...
	* #WORK: compilation is pretty!
	* #WORK: make all ++ make rootfs = use default kernel
	* #WORK: make all ++ make release = completely new kernel, size limit
	* #WORK: make rootfs can be used on any chroot filesystem, as long as /.gary-os and modules.tar.xz are included
	* #WORK: rootfs = exec sh /initrc rootfs
	* #WORK: document "$dofast" and "$domods"...?  in the script/makefile, or just the docs?  pointers to "readme"?
	* #WORK: document "$rootfs" and "$fstest"...?  in the script/makefile, or just the docs?  pointers to "readme"?
	* #WORK: document "$doredo"...?  in the script/makefile, or just the docs?  pointers to "readme"?
	* #WORK: make $greset variable...?  same as above...
	* #WORK: migrate "/.install" link hacking, and other instructions, and remove from "\_gary-os"
	* #WORK ~350m grub limit for size, and keeping under ~4gb ram
	* #WORK somewhere in here: rootfs can be any loopback with an /init [and lib/modules packdir?] -- module detection and loading will be done by gary-os kernel
-->

### Hard Drive Install #########################################################
[Hard Drive Install]: #Hard_Drive_Install

<!--
#WORK: find all "system installation" references in scripts and this file, and fix
#WORK: cross-reference with "prepare\_config" function in "\_release" script
#WORK: config_protect in make.conf / expect wrapping -> configuration files

	#WORKING
-->
  * Definition:
    * Install GaryOS to disk
  * Last tested with:
    * GaryOS v3.0

<!--
	#WORK validation steps: verify table against "\_system" and "\_release"... in "\_release", also validate the "\_prepare\_config" table
	#WORK https://funtoo.org/Install
	#WORK completely default, all configs reset, hostname, wireless, root password
-->

The in-memory environment is a complete Funtoo installation, as shown in the
[Live Update] section above.  It can be copied directly to a new disk/partition
and booted as a fresh installation like a standard `stage3` file.

As part of the release build process, several files are added, replaced,
modified or removed to create a particular look and feel for GaryOS.  These
modifications are kept to an absolute minimum, and are listed here:

<!--
	#WORK validate this table looks good in composer/github
	#WORK: double-check against _prepare_config
	#WORK: unpack -> PACK_DIRS! --> touchfile
-->

| File                                      | Release Modification | Install Action
|:---                                       |:---                  |:---
| /.gary-os                                 | Added                | Remove
| /.gary-os.packages.txt                    | Added                | Remove
| --                                        | --                   | --
| ~~/boot/\_null\_kernel~~                  | ~~Added~~            | ~~Keep~~
| /usr/src/linux                            | Removed              | Restore *(unpack)*
| /usr/src/linux-\*                         | Removed              | Remove
| /usr/src/linux.tar.xz                     | Added                | ~~Remove~~ = Keep
| /var/git/meta-repo                        | Removed              | Restore *(unpack)*
| /var/git/meta-repo\*.tar.xz               | Added                | ~~Remove~~ = Keep
| --                                        | --                   | --
| /etc/issue                                | Replaced             | ~~Restore~~ = Keep
| /etc/motd                                 | Added                | ~~Remove~~ = Keep
| /init                                     | Added                | ~~Remove~~ = Keep
| /etc/fstab                                | Modified             | ~~Restore~~ = Keep
| /etc/conf.d/hostname                      | Modified             | ~~Restore~~ = Keep
| /etc/profile.d/setterm.sh                 | Added                | ~~Remove~~ = Keep
| /etc/wpa\_supplicant/wpa\_supplicant.conf | Replaced             | ~~Restore~~ = Keep
| /etc/ssh/sshd\_config                     | Modified             | ~~Restore~~ = Keep
| /etc/env.d/90xsession                     | Added                | ~~Remove~~ = Keep
| /etc/X11/Sessions/dwm                     | Modified             | ~~Restore~~ = Keep

Some other important changes, which must all be reset manually:

  * Linux kernel configuration, sourced from `linux` directory
  * Funtoo system configuration, sourced from `gentoo` directory
<!--
	#WORK: FSPACK variable, add list here, add note to variable, just like in \_release for table
	#WORK: FSSKIP variable, add list here, add note to variable, just like in \_release for table
	#WORK: FSPKRC variable, add list here, add note to variable, just like in \_release for table
-->
  * The `#{RCUPDT}` commands in the `gary-os` package file, sourced from the
    `gentoo/sets` directory
<!--
	#WORK: all the "sets" variables like RCUPDT
-->
  * Root password set to `gary-os`

<!--
	#WORKING : validate
	create/document "reset" option in "\_release"... manual changes are up to the reader...
	need gpt/mbr partitions for below... maybe use the "grub.sh" script... otherwise, suggest the proper partitions...
		add partition table to grub section, and reference here...

	#WORKING : document somewhere a mounted chroot build as a form of install... (man, am i getting too nuts, here?)
	#WORKING : make install --reset == \_prepare\_config --reset || \_prepare\_config
-->

Instructions for installing to disk:

<!--
	#WORKING : or use "grub.sh"

	#WORK: does this format correctly, or does it need an empty line... make consistent throughout file...
-->

  1. Mount formatted disk/partition.

     ```
     `mke2fs -t ext4 -jv /dev/sda2`
     `mkdir /.install`
     `mount /dev/sda2 /.install`
     ```
  2. If you wish for `/boot` to be on a separate partition, mount that
     location in the target.
     * e.g. `mkdir /.install/boot`
     * e.g. `mount /dev/sda1 /.install/boot`
  3. #WORKING : now we have "make install"... warning, though, because it resets the configs on the live system... (the only way around this is horrifying)
  4. Add necessary partition information to `/etc/fstab`, remembering an
     entry for `/boot` if using a separate partition from #2 above.
     * e.g. `vi /.install/etc/fstab`
<!--
	#WORKING : use "grub.sh", now...
	#WORK need "grub" when "boot-update" here?
-->
  5. Update and install Grub, to make the new installation bootable.
     * e.g. `for FILE in dev proc sys ; do mount --bind /${FILE} /.install/${FILE} ; done`
<!--
	#WORK efi: neet to mount efi partition to "/boot" for this to work...
-->
     * e.g. `chroot /.install grub-install --target=x86_64-efi --efi-directory=/boot /dev/sda`
     * e.g. `chroot /.install grub-install --target=i386-pc /dev/sda`
     * e.g. `chroot /.install boot-update`
  6. Reboot into new installation, update `/etc/portage` configuration,
     install Portage tree and update/install packages as desired.
  7. **Don't forget to change `/etc/conf.d/hostname` and update the `root`
     password!**

--------------------------------------------------------------------------------

# Version History ##############################################################
[Version History]: #Version_History

<!--
	#WORKING

	#WORK versioning scheme = 4.x is new commit, x.1 is update to existing commmit (rare)
	#WORK make sure all "\_" are "\" escaped
	#WORK switch as many lists as makes sense to tables...  verify that composer/github markdown render them... same with "~~"
	#WORK change title from "use cases" to "HOWTOs + Validation"
	#WORK build-witin-the build is "Live Rebuild (Build-Within-The-Build)" -> must use same kernel, unpack happens automatically (does it really?)
	#WORK add links pointing to the release tags/commits
	#WORK holy crap!  stuff is getting big... gcc=x2 python=x3 linux-firmware=x5 (removed surf/wireshark/gvim/gtk...)... no added packages, and still XXXmb(?) bigger... rootfs about the same?
	#WORK also, did add meta-repo.tar.xz and linux.tar.xz... is a true live system, but this only added ~130mb... vast majority came from above... check gary-os.packages.txt
	#WORK kernel tmpfs hack to squeeze into 4gb ram... probably want 6gb to do anything beyond the basics... (xorg can still work...)
	#WORK	add kernel hack diff publish to upstream tw task... add published commit to "acknowledgements" section
	#WORK use cases: put in better order, to be tested sequentially...  add details about release validation steps/process...  (this is how to get from windows to linux...)
	#WORK		release steps... final dates i
	#WORK	simple qemu boot test
	#WORK		[Forensics + Recovery]
	#WORK		[Networking Configuration]
	#WORK		[Minimal X.Org GUI]
	#WORK	qemu boot test, using windows.null.qcow2 as a snapshot of base windows
	#WORK		[Windows Dual-Boot]
	#WORK	still in windows.null.qcow2, format disk for usb drive
	#WORK		[Grub Rescue]
	#WORK		(USB INSTALL)
	#WORK	still in windows.null.qcow2, boot from "usb drive" emulation
	#WORK		[Live Update]
	#WORK		(BUILD-WITHIN-THE-BUILD, PART 1 - BUILD) == tomsrtbt!
	#WORK			can one "make O=/ doit release" within a running "ramfs"?  tee hee.
	#WORK				yes!  do exactly this, with gary-os.base package set, and this is the minimal 4gb build...
	#WORK			(how much memory does it take to do this?)
	#WORK			may consider removing meta-repo.tar.xz and/or linux.tar.xz to save space, but won't be able to sub-build after that...
	#WORK	still in windows.null.qcow2, boot from "usb drive" emulation into build-within-the-build
	#WORK		(BUILD-WITHIN-THE-BUILD, PART 2 - RUN)
	#WORK		[Installation, PART 1 - INSTALL)
	#WORK	still in windows.null.qcow2, boot from "usb drive" emulation into install
	#WORK		[Installation, PART 2 - RUN)
	#WORK	still in windows.null.qcow2, boot from "usb drive" emulation after wiping grub somehow
	#WORK		[PXE Boot, PART 1 - TEST GRUB RESCUE, BOOT INSTALLATION]
	#WORK		[PXE Boot, PART 2 - GARYOS]
	#WORK		(RESCUE INSTALLATION, USING GARYOS, AND BOOT TO RESCUED INSTALLATION
	#WORK	ld: kernel image bigger than KERNEL_IMAGE_SIZE -> initrd build, supported
	#WORK		not hacking kernel, for good reason... see comments at the bottom of (kernel_source)/arch/x86/include/asm/page_64_types.h

	#WORK random: feature request to funtoo for "ego sync" commit pinning... send funtoo.kits
	#WORK random: feature request to linux kernel for "SHMMAX (/2)" value... create patch!
	#WORK random: todo list: add real argument processing to "system" script someday...
-->

[Distfiles Directory]: https://sourceforge.net/projects/gary-os/files/_distfiles
[Packages Directory]: https://sourceforge.net/projects/gary-os/files/_packages

[Kernel]: https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.kernel
[Rootfs]: https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.rootfs
[Grub]: https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.grub.zip
<!--	#WORKING: XX-XX, here, title, and table of contents -->
[Notes]: https://github.com/garybgenett/gary-os/blob/v4.0/README.md#v40-2020-XX-XX
[License]: https://github.com/garybgenett/gary-os/blob/v4.0/LICENSE.md

[v5.0]: https://github.com/garybgenett/gary-os/commits/master

## v4.0 2020-XX-XX #############################################################
[v4.0 2020-XX-XX]: #v4.0_2020-XX-XX
[v4.0]: #v4.0

  * Files -- [Readme](https://github.com/garybgenett/gary-os/blob/v4.0/README.md)
    / [License](https://github.com/garybgenett/gary-os/blob/v4.0/LICENSE.md)
    / [Packages (Kernel)](https://github.com/garybgenett/gary-os/blob/v4.0/packages.txt)
    / [Packages (Rootfs)](https://github.com/garybgenett/gary-os/blob/v4.0/packages.rootfs.txt)
    * Kernel: [gary-os-v4.0-generic_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.kernel)
    * Rootfs: [gary-os-v4.0-generic_64.rootfs](https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.rootfs)
    * Grub: [gary-os-v4.0-generic_64.grub.zip](https://sourceforge.net/projects/gary-os/files/gary-os-v4.0-generic_64.grub.zip)
    * Source Stage3: [stage3-core2_64-funtoo-current-2018-08-27.tar.xz](https://sourceforge.net/projects/gary-os/files/v4.0/stage3-core2_64-funtoo-current-2018-08-27.tar.xz)
    * Source Portage: [gary-os-v4.0-generic_64.meta-repo.tar.xz](https://sourceforge.net/projects/gary-os/files/v4.0/gary-os-v4.0-generic_64.meta-repo.tar.xz)
  * Major changes
<!--
    * #WORKING: Replaced Metro with the same build system as the one for full installations
    * #WORKING: Completely switched to personal configuration
    * #WORKING: Removed 32-bit support (fewer builds)
    * #WORKING: Increased memory requirements
    * #WORKING: Added "minimal" binary?
	#WORKING
    * #WORKING: Completely disabled swap in Linux kernel configuration
-->
  * Funtoo configuration
<!--	#WORKING -->
  * Build system
<!--	#WORKING -->
  * Grub script
<!--	#WORKING -->

## v3.0 2015-03-16 #############################################################
[v3.0 2015-03-16]: #v3.0_2015-03-16
[v3.0]: #v3.0

  * Files -- [Readme](https://github.com/garybgenett/gary-os/blob/v3.0/README.md)
    / [License](https://github.com/garybgenett/gary-os/blob/v3.0/LICENSE.md)
    / [Packages (64-bit)](https://github.com/garybgenett/gary-os/blob/v3.0/_packages.64)
    / [Packages (32-bit)](https://github.com/garybgenett/gary-os/blob/v3.0/_packages.32)
    * Kernel (64-bit): [gary-os-v3.0-generic_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v3.0-generic_64.kernel)
    * Kernel (32-bit): [gary-os-v3.0-generic_32.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v3.0-generic_32.kernel)
    * Grub: [grub.sh](https://github.com/garybgenett/gary-os/blob/v3.0/scripts/grub.sh)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2015-01-27.tar.xz](https://sourceforge.net/projects/gary-os/files/v3.0/stage3-core2_64-funtoo-stable-2015-01-27.tar.xz)
    * Source Portage: [portage-21811b59a8484b2a6b73e0c5277f23c50a0141dc.0.tar.xz](https://sourceforge.net/projects/gary-os/files/v3.0/portage-21811b59a8484b2a6b73e0c5277f23c50a0141dc.0.tar.xz)
  * Metro/Grub scripts
    * Release checklist in Metro script
    * General updates for upstream Metro changes/enhancements
    * Minor configuration updates for LVM, Postfix and Vim
    * Date variables for Funtoo/Grml upstream files/images
    * Warnings for non-matching upstream files/images
    * Miscellaneous syntax clean-up
    * Additional debugging option in Grub script
    * Updated list of Grub rescue modules
    * Grub rescue options variable
  * Funtoo configuration
    * Updated to new Portage commit
    * Minor improvements to audit/review scripting
    * Fixed `USE` variable, enabling Udev globally
    * Added additional input drivers, for touch devices
    * Added helper packages for networking and basic X.Org GUI scripting

## v2.0 2014-06-19 #############################################################
[v2.0 2014-06-19]: #v2.0_2014-06-19
[v2.0]: #v2.0

  * Files -- [Readme](https://github.com/garybgenett/gary-os/blob/v2.0/README.md)
    / [License](https://github.com/garybgenett/gary-os/blob/v2.0/LICENSE.md)
    / [Packages (64-bit)](https://github.com/garybgenett/gary-os/blob/v2.0/_packages.64)
    / [Packages (32-bit)](https://github.com/garybgenett/gary-os/blob/v2.0/_packages.32)
    * 64-bit kernel: [gary-os-v2.0-generic_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v2.0-generic_64.kernel)
    * 32-bit kernel: [gary-os-v2.0-generic_32.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v2.0-generic_32.kernel)
    * Grub: [grub.sh](https://github.com/garybgenett/gary-os/blob/v2.0/scripts/grub.sh)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v2.0/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-873ca4a3a4e6ff41e510dbcf2e0fe549fb23474d.0.tar.xz](https://sourceforge.net/projects/gary-os/files/v2.0/portage-873ca4a3a4e6ff41e510dbcf2e0fe549fb23474d.0.tar.xz)
  * Metro/Grub scripts
    * Added creation of package list files
    * Added `METRO_DEBUG` variable, for testing
    * Improved customization of `LDFLAGS` and `USE` variables
    * Better exemption handling for packages which fail to build
    * Fixed initrd build, so that it is more generally useful/applicable
    * Added documentation repository to commit tracking
    * Included Git repository in root filesystem, for reference
    * Moved Git repository handling to dedicated "git-export" function
    * Renamed example Grub disk image to a better extension
  * Funtoo configuration
    * Updated to new Portage commit
    * Complete review/revamp of USE flags
    * Added `LDFLAGS` variable options specific to Metro
    * Cleaned up "\_overlay" directory
    * Improvements to audit/review scripting
    * Minor configuration updates/improvements
    * Localized failed package commenting to 32-bit
    * Revised package list, adding CLI (Command-Line Interface) helpers
      and X.Org GUI, while pruning packages that are not as generally
      useful or widely implemented
      * In particular, removed custom Perl modules, Funtoo
        developer/specialized packages, document processing utilities,
        virtualization tools and media software
      * Previously, the X.Org GUI was a specific non-goal of the
        project.  However, certain extremely useful packages (such as
        Wireshark) required it.  The additional screen real-estate is
        also useful for management of multiple terminals and
        web-browsing for solutions to issues.  In order to meet these
        needs, it was decided to incorporate X.Org GUI packages with
        a minimal window manager footprint.
      * CLI interface remains the default (see [Graphical Interface]
        section for information on loading up and using the graphical
        environment).

## v1.1 2014-03-13 #############################################################
[v1.1 2014-03-13]: #v1.1_2014-03-13
[v1.1]: #v1.1

  * Files -- [Readme](https://github.com/garybgenett/gary-os/blob/v1.1/README)
    / [License](https://github.com/garybgenett/gary-os/blob/v1.1/LICENSE)
    * 64-bit kernel: [gary-os-v1.1-generic_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v1.1-generic_64.kernel)
    * 32-bit kernel: [gary-os-v1.1-generic_32.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v1.1-generic_32.kernel)
    * Grub: [grub.sh](https://github.com/garybgenett/gary-os/blob/v1.1/scripts/grub.sh)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v1.1/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-95ad4fd257697618bae7402d4bc3a27499035d30.4.tar.xz](https://sourceforge.net/projects/gary-os/files/v1.1/portage-95ad4fd257697618bae7402d4bc3a27499035d30.4.tar.xz)
  * Metro/Grub scripts
    * Added Linux kernel configurations from Grml, to provide more
      comprehensive and flexible hardware/feature support
    * Created Grub script, for rescue and dual-boot
    * Syntax and formatting clean-up
  * Funtoo configuration
    * Miscellaneous package changes

## v1.0 2014-02-28 #############################################################
[v1.0 2014-02-28]: #v1.0_2014-02-28
[v1.0]: #v1.0

  * Files -- [Readme](https://github.com/garybgenett/gary-os/blob/v1.0/README)
    * 64-bit kernel: [gary-os-v1.0-generic_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v1.0-generic_64.kernel)
    * 32-bit kernel: [gary-os-v1.0-generic_32.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v1.0-generic_32.kernel)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v1.0/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-95ad4fd257697618bae7402d4bc3a27499035d30.3.tar.xz](https://sourceforge.net/projects/gary-os/files/v1.0/portage-95ad4fd257697618bae7402d4bc3a27499035d30.3.tar.xz)
  * Metro script
    * Completed support for both 64-bit and 32-bit builds
    * Switched to `generic` for all builds
    * Removed `-fomit-frame-pointer` GCC flag
    * Removed Grub customizations
    * Re-added `/boot` and `/var/db/pkg` directories, so the initramfs
      can be used as a "stage3" replacement
    * Added release/distribution processing
  * Funtoo configuration
    * Commented packages that broke during 32-bit build

## v0.3 2014-02-24 #############################################################
[v0.3 2014-02-24]: #v0.3_2014-02-24
[v0.3]: #v0.3

  * Files
    * 64-bit kernel: [gary-os-v0.3-core2_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v0.3-core2_64.kernel)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.3/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-95ad4fd257697618bae7402d4bc3a27499035d30.2.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.3/portage-95ad4fd257697618bae7402d4bc3a27499035d30.2.tar.xz)
  * Metro script
    * Consolidated kernel/initrd into single kernel/initramfs file
    * Added initial support for both 64-bit and 32-bit builds
  * Funtoo configuration
    * Updated build/installation script with code to expand Metro
      "stage3" files for testing package builds and fixing breaks
    * Customized package list and USE flags for Metro build, to reduce
      size of installation to below 500MB Linux kernel limit
    * Completely removed X, Java and TeX Live / LaTeX
    * Added sound and miscellaneous media packages

## v0.2 2014-02-13 #############################################################
[v0.2 2014-02-13]: #v0.2_2014-02-13
[v0.2]: #v0.2

  * Files
    * 64-bit kernel: [gary-os-v0.2-core2_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v0.2-core2_64.kernel)
    * 64-bit initrd: [gary-os-v0.2-core2_64.initrd](https://sourceforge.net/projects/gary-os/files/gary-os-v0.2-core2_64.initrd)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.2/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-95ad4fd257697618bae7402d4bc3a27499035d30.1.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.2/portage-95ad4fd257697618bae7402d4bc3a27499035d30.1.tar.xz)
  * Metro script
    * Added revision handling
  * Funtoo configuration
    * Added packages from Grml and SystemRescueCD package lists
    * Enabled `gpm` USE flag

## v0.1 2014-02-09 #############################################################
[v0.1 2014-02-09]: #v0.1_2014-02-09
[v0.1]: #v0.1

  * Files
    * 64-bit kernel: [gary-os-v0.1-core2_64.kernel](https://sourceforge.net/projects/gary-os/files/gary-os-v0.1-core2_64.kernel)
    * 32-bit initrd: [gary-os-v0.1-core2_64.initrd](https://sourceforge.net/projects/gary-os/files/gary-os-v0.1-core2_64.initrd)
    * Source Stage3: [stage3-core2_64-funtoo-stable-2014-01-13.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.1/stage3-core2_64-funtoo-stable-2014-01-13.tar.xz)
    * Source Portage: [portage-95ad4fd257697618bae7402d4bc3a27499035d30.0.tar.xz](https://sourceforge.net/projects/gary-os/files/v0.1/portage-95ad4fd257697618bae7402d4bc3a27499035d30.0.tar.xz)
  * Metro script
    * Initial proof of concept, with separate kernel/initrd files
  * Funtoo configuration
    * Active personal configuration at time of build
    * Commented packages that broke

--------------------------------------------------------------------------------

# Release Process + Checklist ##################################################
[Release Process +_Checklist]: #Release Process + Checklist

<!--	#WORKING -->

--------------------------------------------------------------------------------
*End Of File*

<!--
	#WORK
# * final run to standardize https/http
# * running list of gary-os service dependencies; automated tests?
#	* ftp/external
#	* shell utils
#	* smbd
#	* start using "_toor" to validate
#		* rsync ".runit", "wtmp", etc.
	#WORK
#	* port "metro.sh" script command(s) into here
#		* update -2 to be the init/hostname/passwords and add "emerge --depclean --with-bdeps=n"
#		* use custom kernel, and get rid of grml (readme, acknoledge kernel config and package lists)
#		* use formal release filenames insteaed of "_ramdisk"
#		* add ramdisk and release optiosn, so that metro.sh "-/" (now "-2"), "-1" and "-!" are all separate; what to do with "-! -!" option?
#	* document meta-repo ".git" dir handling
#	* update ram requiresments to 8b minimum, packages have gotten fat!
#		* need more room in root filesystem, and memory could easily be just 6gb; need to do some kernel configuration tuning...
#		* speaking of the kernel and ramdisk, can we get a status/progress indicator in there... "cpio -v"...?
#		* double-check updates in package list, just to be sure it is normal cruft; compare sizes of openbox/dwm and firefox/surf?
#			* /lib/modules/4.14.12-2 directory?  get rid of this!
#		* prompt -d -x ; qemu-minion.bsh /.g/_toor/_ramfs.kernel "" -m 8192 -vga std
#			* why is "startx" not working?
#	* did you know that if you run "[chroot]" with no other options it will do an update?  we should kill this or document it...
#	* Makefile, _system and _release all need to stay in sync...!
	#WORK
#	* systemrescuecd package list: extract to "sets" directory, and comparison
#	* EFI commands/notes, and grub.sh
#		* https://kernel.org/doc/Documentation/efi-stub.txt
#		* https://wiki.archlinux.org/index.php/EFISTUB#Booting_EFISTUB
	#WORK
#	* release process:
#		* metro
#			* ~/setup/gentoo/_system -q -g -y
#				* ~/setup/gentoo/_system -q -g -y -j {package}
#			* ~/setup/gentoo/_system -q -g -y -j
#		* packages
#			* ~/setup/gentoo/_system -q -x -y -j
	#WORK
#	* document qemu boot time (and system cpu/memory) each release
#	* note about adding qemu/kvm scripts (probably qemu deserves mention as a project after all...
	#WORK
#	* make fetch -> create dynamic fetchlist from _ramfs.packages.txt, $WGET_C from sourceforge
#		* test/add build instructions using files from sourceforge
	#WORK
	#WORK finalize
	#WORK release process note to do a "make -f /.g/_data/zactive/.setup/gentoo.gary-os/Makefile L=_gary-os doit" run, to get all those packages built in the \_packages directory
	#WORK release process a final pass "make -f /.g/_data/zactive/.setup/gentoo.gary-os/Makefile doit" run, to remove binaries but keep the distfiles and packages
	#WORK release process note or automation to delete *.cpio{,.dir,.txt}
	#WORK before doing first "_release" run of any sort, verify "system installation" table of modified files
	#WORK do htop -> f5 to verify process tree during test cases validation
	#WORK _gary-os.boot symlink ++ _sync boot
#- release checklist:
#	* build
#		* [complete all commits in ".setup", ".static" and "coding"]
#			* rm /.g/_data/_build/_metro/funtoo-*/*/*/*/stage3-*
#		* metro.sh -! ++ (echo | metro.sh 32 0) ++ (echo | metro.sh 64 0)
#			* qemu-minion.bsh /.g/_data/_builds/_metro/stage3-generic_32-*.kernel "" -append nomodeset
#			* qemu-minion.bsh /.g/_data/_builds/_metro/stage3-generic_64-*.kernel "" -append nomodeset
#			* (test grub.sh install/boot on secondary disk)
#		* cd /.g/_data/_builds/_metro ++ cat _commit
#			* [verify with "git-list" in each repository]
#		* cd /.g/_data/_builds/.gary-os/.gary-os ; vdiff -g v#.#
#			* [COMMIT] Added "v#.#" release to "Version History" in "README".
#			* [COMMIT] Tested/validated/updated "Use Cases" with "v#.#" version.
#	* commit
#		* cd /.g/_data/_builds/_metro ++ git-backup <version>
#		* [update "$RELEASE" and "$CMTHASH" in "metro.sh"]
#		* metro.sh -! ++ (echo | metro.sh 32 0) ++ (echo | metro.sh 64 0)
#		* cd /.g/_data/_builds/_metro ++ git-commit --all --amend --no-edit
#			* [COMMIT] (RELEASE:########################################.#) (tag: v#.#)########
#		* [update/commit "$RELEASE" and "$CMTHASH" in "metro.sh"]
#			* [COMMIT] Added new release to version tags in "metro.sh".
#	* release
#		* ls /.g/_data/_builds/.gary-os/metro.gitlog/cur | tail -n1
#			* rm /.g/_data/_builds/.gary-os/metro.gitlog/cur | tail -n[<result>
#		* cd /.g/_data/_builds/.gary-os/.gary-os ++ git-list
#			* git reset --hard HEAD^1
#		* metro.sh -! -!
	#WORK
WORK -->

<!-- WORK

	* readme.md (needs to be in release process...)
		* all work markers
		* rewrite
		* test cases
		* review/edit, spell check and "f11/gq" formatting
		* verify composer/pandoc (toc=6) and github

#WORK somewhere in here there needs to be a "ln ../[...] reldir/v#.#" step, probably at the beginning of testing, to verify unpack downloads...
#WORK ncdu and ln ... /.install and rm build/.unpack commands, to verify sizes and test unpacking (if tested locally, does network fetch really need to be tested?
	* release
		* complete run of both
			* gentoo, comment haskell-updater
			* gary-os, uncomment haskell-updater, all repositories clean
		* commit gentoo
			* verify use_garyos/package.use against _gentoo/.emerge (+sorted properly = globals / updated or package use)
			* _sync _sys _clone _full _setup on spider/shadow
		* [\_gary-os] package set instructions/notes, move to readme instead?
		* _publish git
			* gentoo.gary-os -> .validate
		* updated screenshots
		* release process for gary-os
			* https://github.com/pbatard/rufus/releases/download/v3.7/rufus-3.7p.exe
			* make clean release
			* verify root filesystem contents
			* publish_prep
				* remove *.cpio{,.dir} = keep only *.{txt,xz}
				* remove /tmp/.ccache
				* etc.
			* rsync working -> production
			* verify gitignore -> commit
			* update gary-os.boot symlink
			* _publish, new version and hash
			* _publish, verify github and sourceforge (links are all working)
			* update sourceforge download button

	* announcement email

	* Celebrate!

-->
