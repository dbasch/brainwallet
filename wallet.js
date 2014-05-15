//proof of concept Bitcon brain wallet

function rand_word() {
    var i = Math.floor(Math.random() * words.length);
    return words[i];
}

function create_phrase() {
    w = new Array(7);

    for (i = 0; i < 7; i++) {
        w[i] = rand_word();
    }
    return w.join(' ');
}

function derive_seed(phrase) {
    scrypt = scrypt_module_factory();
    seed = scrypt.crypto_scrypt(scrypt.encode_utf8(phrase),
                                    scrypt.encode_utf8(""),
                                    16384, 8, 1, 32);
    return seed;
}

function bitcoin_key(seed) {
    return Bitcoin.ECKey(seed);
}

//generate a random phrase and derive a key/pair from it
function generate() {
    p = create_phrase();
    derive_wallet(p);
}

//re-create a key/address pair from a phrase supplied by the user
function recreate() {
    p = document.getElementById("userphrase").value;
    derive_wallet(p.trim().toLowerCase());
}

//generate a key/address pair from a phrase
function derive_wallet(p) {
    tmp = derive_seed(p);
   
    //prepend a 0 so BigInteger doesn't think it's negative
    seed = new Uint8Array(33);
    seed[0] = 0;
    seed.set(tmp, 1);
    
    n = BigInteger.fromByteArrayUnsigned(seed);
    
    //in theory we should check that n is within range
    //for a bitcoin key, that is
    // 0 < n < 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

    k = new Bitcoin.ECKey(n);

    phrase = document.getElementById("phrase");
    key = document.getElementById("key");
    address = document.getElementById("address");

    phrase.innerHTML = p;
    key.innerHTML = k.getExportedPrivateKey();
    address.innerHTML = k.getBitcoinAddress();
}

