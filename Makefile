ARCHES := x86 arm
include node_modules/@start9labs/start-sdk/s9pk.mk

$(BASE_NAME)_%.s9pk: $(INGREDIENTS) $(GIT_DEPS) | check-deps
	@$(MAKE) --no-print-directory ingredients
	@echo "   Packing '$@'..."
	start-cli s9pk pack . --arch=$* -o $@
