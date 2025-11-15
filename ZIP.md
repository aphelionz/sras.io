# Shielded Registry Assets [under NU6] 

## Preamble
[TODO: Front Matter]

## Terminology
The key words "SHOULD", "SHOULD NOT", "RECOMMENDED", and "MAY" in this document are to be interpreted as described in BCP 14 when, and only when, they appear in all capitals.
Private payments and auditability: Orchard shielded transfers with incoming/outgoing viewing keys allow selective disclosure. Good fit for compliant private settlement.

## Abstract
This ZIP describes a suggested protocol dealers of real world assets SHOULD follow when selling assets.

Based on real-world experience with two art estates: 

## Motivation
Inverse of NFTs - not a digital representation of asset, the asset itself comes first and 
Estate as minting authority - has the certificate. Human layer (social/legal/moral/reputational authority of the estate). Provides legitimacy.
Catalog Raisonnè is the key here - software can generate.
Onboarding is important
Feasible today (NU6, no TZE, no ZSA): use private ZEC payments + off-chain title registry + anchored attestations. No on-chain asset. No atomic barter. Provenance is cryptographically linked, not enforced.
Privacy Implications
This ZIP makes no protocol or policy changes and thus privacy implications remain consistent with those in the current network upgrade.

## Requirements

Requirement: must have a wallet app with multiple accounts aka seed phrases.

## Rationale
Value-add: Pieces with digital attestations can be a higher price.

## Specification
Catalog
Assign catalog_id
Optional Threshold control: Use FROST-style RedPallas multisig for estates/custodians. Practical for “verified custodian” keys.
Wallet
Create a per-artwork account in your wallet (new diversified UA + its own IVK). 
12 word phrase per artwork
Creates a provenance chain of transactions within that account
This scopes later disclosures.
Listing
Publish off-chain record: catalog_id, hashes, asking terms, delivery policy, estate PGP, and a public COA QR with: 
version - int - format identifier
catalog_id - int - from raisonne
media_hash 
registry_url
Prepare a sealed COA QR with:
Per-artwork IVK (viewing key)
COA serial
Recovery_contact
Optional Notarized Certificate points to digital attestation
Signed by signature in the DID
Sale #1
Payment
Buyer generates a fresh shielded address.
Seller requests payment to a designated sale address (can be the per-artwork account).
Best if on Zcash
Can be any crypto via CrossPay
Can be fiat / tradfi -> swap to ZEC -> Estate “pays” self
Buyer pays ZEC privately. Automated tool populates Memo with includes a compact receipt: catalog_id || H_media || nonce.
Wait some confirmation depth for probabilistic finality
Seller confirms funds by scanning with the per-artwork IVK.
Delivery + attestation
Physical handover occurs. Courier or custodian issues a verifiable credential (VC) stating handover (time, place, parties, catalog_id).
Seller (or registry) anchors the VC by sending a tiny self-transfer from the per-artwork account with memo H_VC || sale_txid. Keep txid.
Title transfer (off-chain)
Registry updates owner to Buyer, signed by Seller and Registry keys. Record: sale_txid, anchor_txid, H_VC.
Seller hands over COA with sealed QR (per-artwork IVK). Buyer can now selectively disclose only this account’s activity to auditors/insurers.
Resale (can repeat over and over)
Due Diligence phase	
Buyer SHOULD contact estate (estate will contact galleries / art market participant / shareholder). Value Add
Optional third-party auditor could use the per-artwork IVK to see only relevant txs, then checks each VC hash anchoring tx.
Estate provides security, privately.
Offer: COA or Appraisal $$$ S/S/S/
Best if on Zcash
Can be any crypto via CrossPay
Can be fiat / tradfi -> swap to ZEC -> Estate “pays” self
Value add
Payment
Blind payment happens between two second parties
New owner should GOTO #6

## Reference Implementation
https://sras.io



