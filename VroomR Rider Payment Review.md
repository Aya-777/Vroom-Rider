# VroomR Rider Payment Review

## Source of truth
The user's pasted Claude conversation is the current implementation reference. It specifies a React Native rider app with an existing modular/MVVM style, React Navigation, i18next, a custom Theme system, `ActionButton`, `BaseBottomSheet`, and a shared Zustand wallet store.

## Confirmed payment decisions
- Payment provider assumed by the conversation: Stripe PaymentIntent.
- Frontend package: `@stripe/stripe-react-native`.
- Frontend receives `client_secret` and passes it to Stripe PaymentSheet; it does not copy it to PowerShell and does not handle secret API keys.
- Backend must provide a matching Stripe publishable key (`pk_test_...`) from the same Stripe account that generated the client secret.
- Backend webhook/server verification is the source of truth after PaymentSheet; frontend refreshes wallet balance afterward.
- Test mode uses fake cards and no real money.
- Production Stripe availability for a Syrian entity remains a backend/business decision; the app should keep a provider abstraction if possible.

## Expected backend endpoints mentioned in the conversation
- `GET /payments/wallet/`
- `POST /payments/wallet/topup/`
- `GET /payments/wallet/transactions/`
- A backend endpoint for pre-ride balance validation.
- A backend endpoint or trip completion response for final fare settlement.
- The conversation also references a Stripe webhook path shown in a screenshot: `/payments/stripe/webhook/`, but this needs confirmation from the actual backend contract.

## Expected frontend module
Likely `modules/payments/` with:
- `types/payments.types.ts`
- `api/paymentsApi.ts`
- `repositories/paymentsRepository.ts`
- `store/useWalletStore.ts`
- `hooks/useWalletActions.ts`
- `viewmodels/useWalletViewModel.ts`
- `screens/WalletScreen.tsx`
- `screens/TopUpScreen.tsx`
- `screens/TransactionsScreen.tsx`
- `components/InsufficientBalanceModal.tsx`
- payment styles and `payments` i18n translations.

## Existing component constraints observed in Claude conversation
- `ActionButton` uses `title`, not `label`.
- Existing `ActionButton` initially did not support `variant`, `disabled`, or `loading`; Claude proposed adding `disabled` and `loading` backward-compatibly.
- `BaseBottomSheet` uses `isVisible`, not `visible`.
- Existing import style includes relative imports such as `../../../shared/components/ActionButton`.
- Existing styles use `ThemeColors` from `core/theme/theme.types`, and `Radius`, `Shadows`, `Spacing`, `Typography` from `core/theme/tokens`.
- Existing app uses `useTheme()` from `core/theme/useTheme` and `useTranslation('payments')`.

## Wallet/trip business flow
1. User chooses cash or wallet before driver matching.
2. Cash proceeds without wallet validation.
3. Wallet requires backend validation of estimated fare before matching.
4. If insufficient, show `InsufficientBalanceModal` with switch-to-cash and top-up actions.
5. Top-up calls backend, receives `client_secret`, initializes/presents PaymentSheet, then refreshes wallet from backend.
6. After trip completion, backend calculates final fare and validates/debits wallet if wallet was selected.
7. If final balance is insufficient, show the same modal with `context: 'post_ride'`; the final trip state must remain backend-controlled.

## Last known implementation status in Claude conversation
Claude provided corrected examples for `WalletScreen`, `TopUpScreen`, `InsufficientBalanceModal`, `wallet.styles.ts`, and `ActionButton` enhancements. The last instruction was to run TypeScript checking and then connect the payment module to the ride module. The actual repository was not available in the current sandbox at review time, so no code was verified or changed.

## Access issue
The expected mount `/mnt/desktop/Vroom-Rider` is currently unavailable, and the attached desktop session returned `sidecar not connected`. Repository inspection must resume after the project mount/session becomes available or the user uploads/provides the project files/repository.

## Do not assume until code is inspected
- Exact framework version and whether the project uses Expo or bare React Native.
- Exact navigation route names and registration status for Wallet/TopUp/Transactions.
- Exact API client and auth token handling.
- Exact DTO field names and currency/minimum amount rules.
- Whether Zustand is already installed.
- Whether `@stripe/stripe-react-native` is already installed and native setup is complete.
- Whether the backend uses webhook confirmation, polling, or direct response.
- Exact ride ViewModels where pre-ride and post-ride checks belong.
- Whether an existing wallet or payment module already exists.

## Next action after access is restored
Read repository instructions, package manifest, app entry/providers, navigation, existing payment/ride/auth files, and run the project's existing typecheck/lint/test commands before editing. Then compare actual paths and APIs against this note and Claude's proposed code, report gaps, and only then implement the smallest compatible change.
