# Vocalis

Current source snapshot exported from the Vocalis AppDeploy project.

## Important

This repository is the **current prototype snapshot**, not the finished premium production product.

The browser `speechSynthesis` preview is only a placeholder and is **not** the Vocalis voice engine. The real Qwen3-TTS voice work was tested separately in Google Colab.

## Next engineering step

Import this repository into Replit and continue from this codebase.

The intended production architecture is:

Creator Studio -> Vocalis API -> Voice Engine Service -> Qwen3-TTS / locked voice identities -> audio storage/delivery

The Colab notebook is a research/prototyping environment, not suitable as permanent production hosting. To connect the proven Colab voice work to the app, the Qwen inference code should first be moved into a persistent GPU service (or equivalent GPU endpoint), then the Vocalis backend calls that service. The app should never depend on a temporary Colab share URL.

## GitHub import

1. Create a new GitHub repository named `vocalis`.
2. Extract this ZIP.
3. Upload the extracted files to the repository root.
4. Commit and push.
5. Import the GitHub repository into Replit.
6. Continue the production build there.

## Current voice identities

Male:
- Atlas — Deep & Powerful
- Milo — Natural & Conversational
- Ryder — Husky & Textured
- Adrian — Smooth & Sophisticated
- Jace — Young & Energetic

Female:
- Vera — Rich & Warm
- Nora — Natural & Grounded
- Selene — Deep & Rich
- Maya — Young & Energetic

These are fictional voice identities. Actual reference audio is intentionally not embedded in this repository.
