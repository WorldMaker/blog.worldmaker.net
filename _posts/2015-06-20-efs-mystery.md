---
layout: post
title: Exploring an Encrypted File Mystery
---

I had noticed over the last few months a strange bit of "bitrot" in my music library of songs that I could remember having played before and yet were now throwing "Access Denied" issues. What I thought might turn out to be a simple ACL fix spiralled into an interesting investigation of a deeper mystery and I thought I'd post what I found out in case it helps someone in a similar issue, and also because there's still a bit of a remaining mystery that I'm curious about and maybe someone will have answers.

I particularly started to notice the issues with these files because I was working on a python script to to [shuffle my music library to a thumbdrive](http://github.com/WorldMaker/trueshuffle/). Looking at the files in File Explorer revealed the answer pretty clearly they were colored green for "encrypted under EFS". Having never intentionally encrypted anything with EFS I was worried that maybe something had gone wrong or maybe something malicious was happening. However the very early dates of the encrypted directories, 2009-2012, (`cipher.exe` is useful for finding all the encrypted files on a disk) and the fact that I had the EFS private key (more on that when I come back to the remaining mystery) eliminated the obvious sorts of ransomware viruses. Then I realized the final pattern of all the encrypted directories and finally pieced together these must be remnants of the [Windows 7 zip files extract as encrypted when originating from Mac OSX bug](http://blogs.msdn.com/b/asklar/archive/2012/05/03/why-do-zip-files-from-mac-os-show-up-as-green-encrypted.aspx).

Luckily, I believe that all of these directories are replaceable and it is a very tiny fraction of my overall music library. Luckily none of these directories "virally" grew because I keep my folder structure mostly somewhat consistent. Overall, it's somewhat irritating that I can't seem to decrypt these EFS encrypted files, but luckily it's not a huge problem or a sign of something going horribly wrong. I don't have direct backups of these folders (I backup my music collection to multiple places but these encrypted files apparently quietly never backed up) and I don't think I have a backup copy of the EFS key that encrypted these files.

# The Remaining Mystery

I'm rather curious why these files have stopped decrypting. I'm sure it's likely a result of an OS migration at some point between 2012 and today. That seems reasonably clear.

What confuses me is that from a continuity standpoint, it at least seems that the migration should have "just worked" and as far as I can tell I still have the necessary keys to decrypt the files, but Windows doesn't seem able to decrypt them. Here's the locked room mystery:

- I still have the EFS certificate used to encrypt these files in my account's Personal certificate store.
- The Certificate Manager shows that I still have the private key for that certificate.
- On the other hand, it doesn't allow me to export this private key. (Some sort of Registry or File ACL issue, maybe?)
- `certmgr.exe` tells me that the certificate is fine and pases encryption/decryption tests.
- It was showing as an "Untrusted" certificate and of course it is easy enough to export the public key and add it to "Trusted People", clearing that flag.

I'm curious why EFS can't use the certificate even though it seems to still be available? Strange.

