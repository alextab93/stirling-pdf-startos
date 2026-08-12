# Stirling PDF on StartOS

> **Upstream documentation:** <https://docs.stirlingpdf.com>
>
> Except where noted here, Stirling PDF behaves as documented by the upstream project.

Stirling PDF is a self-hosted PDF editor and processor. This package uses the unmodified official `stirlingtools/stirling-pdf:2.14.3` standard image.

## Runtime

The package supports `x86_64` and `aarch64`. It starts the upstream entrypoint on HTTP port 8080 and exposes one StartOS interface, **Stirling PDF**, at `/`. The API remains on that same origin.

## Persistent data

The single `main` volume contains the following paths:

| Path | Purpose |
| --- | --- |
| `configs/` | Application settings, users, and database state |
| `tessdata/` | OCR language data |
| `pipeline/` | Pipeline definitions and watched-folder state |
| `logs/` | Application logs, excluded from backups |
| `startos/store.json` | StartOS-generated initial admin credentials |

## First run and credentials

On the first installation StartOS creates a random 24-character password for the `admin` user. Run **Get Admin Credentials** in the StartOS actions panel to reveal it. The password remains available through that action after restart, restore, rebuild, and package update.

Change the password from the Stirling PDF interface after signing in. The upstream application does not overwrite an existing user when it receives the initial-login environment variables on later starts.

## StartOS-managed settings

| Setting | Value |
| --- | --- |
| Login | Enabled with the generated `admin` account |
| Additional features | Enabled |
| Search-engine visibility | Disabled |
| Analytics | Disabled |
| Survey | Disabled |

## Backups and health checks

Backups include `configs/`, `tessdata/`, `pipeline/`, and `startos/store.json` as part of `main`. Logs are excluded. Readiness requires `GET /api/v1/info/status` to return exactly `UP`.

## Licensing

The upstream repository root is MIT-licensed, but this image includes components subject to the Stirling PDF User License. Review `LICENSE`, the proprietary license notice, and the upstream terms before production use. This package does not automate commercial licensing.

## Quick reference

```yaml
package_id: stirling-pdf
upstream_version: 2.14.3
upstream_commit: e556eba8326c8349aa0318034cfdb5c442dca21c
image: stirlingtools/stirling-pdf:2.14.3
architectures: [x86_64, aarch64]
volume: main
ports:
  stirling_pdf: 8080
startos_managed_env_vars:
  - SECURITY_ENABLELOGIN
  - SECURITY_INITIALLOGIN_USERNAME
  - SECURITY_INITIALLOGIN_PASSWORD
  - DISABLE_ADDITIONAL_FEATURES
  - SYSTEM_GOOGLEVISIBILITY
  - SYSTEM_ENABLEANALYTICS
  - SHOW_SURVEY
actions: [get-admin-credentials]
```
