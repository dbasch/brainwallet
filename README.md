# Brainwallet

Generate a random seven-word phrase that maps to a bitcoin address. Memorize the phrase. 
Derive the bitcoin address (and key) when needed.

## How it works

The program generates a random phrase of seven words from a pool of 4270 common English words
(see words.txt). The number of possible phrases is on the order of 1E25, or about 84 bits of entropy.

The phrase is transformed into a 256-bit bitcoin private key using Scrypt with the following parameters:

* no salt
* N = 16384
* r = 8
* p = 1
* L = 32

Try it [here](http://diegobasch.com/brainwallet/).

## WARNING WARNING WARNING 

 Be very careful when using this program. If you plan to send money to an address
 generated with it, you should run it on a computer that's not (and will not be)
 connected to the internet. Also, this is as secure as the PRNG your browser uses.
 (If you don't know what a PRNG is, you should not use this program).

 Find this useful? Send me a tip at **1EmwBbfgH7BPMoCpcFzyzgAN9Ya7jm8L1Z** :)

## License

  Copyright © 2014 Diego Basch

  Distributed under the Eclipse Public License version 1.0
