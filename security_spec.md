# Security Spec: StadiumX Core

## 1. Data Invariants
- A user's profile MUST exist in `users/{userId}`.
- User identity integrity MUST be maintained (`auth.uid` == document ID).
- The `role` field on a user document can only be set to `user` or `admin`.
- Self-assigned privilege escalation is strictly forbidden (users cannot upgrade their own role to 'admin').

## 2. The "Dirty Dozen" Payloads
1.  **Identity Spoofing**: Attempt to create a user document with a different UID in the path.
2.  **Role Escalation**: Attempt to create a user document setting `role` to `'admin'`.
3.  **Role Escalation (Update)**: Attempt to update an existing `user` document to `'admin'`.
4.  **Shadow Update**: Include an unapproved key in payload (e.g., `isVerified: true`).
5.  **Type Poisoning**: Set `role` to an integer `1`.
6.  **Size Poisoning (Denial of Wallet)**: Set `displayName` to a 2MB string.
7.  **Unverified Email Attack**: Attempt to create a document with `email_verified: false`.
8.  **Orphaned Write**: Try to write data under a subcollection for a user that does not exist.
9.  **Date Forgery**: Attempt to create a document with a `createdAt` timestamp from 1999.
10. **Date Forgery (Update)**: Attempt to modify `createdAt` during an update.
11. **PII Blanket Get**: Attempt to `get` another user’s document.
12. **Scraping Attack**: Attempt to `list` the users collection.

## 3. Test Runner
We will use `@firebase/rules-unit-testing` via `firestore.rules.test.ts` to assert that all payloads are correctly DENIED by our rules logic.
