from pwdlib import PasswordHash

password_hasher = PasswordHash.recommended()


def hash_password(plain_password: str) -> str:
    hashed_password = password_hasher.hash(plain_password)
    return hashed_password


def verify_password(plain_password: str, stored_hash: str) -> bool:
    verified = password_hasher.verify(plain_password, stored_hash)
    return verified
