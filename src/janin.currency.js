var janin = {};

janin.currency = {
    createCurrency: function (name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate) {
        var currency = {};
        currency.name = name;
        currency.networkVersion = networkVersion;
        currency.privateKeyPrefix = privateKeyPrefix;
        currency.WIF_Start = WIF_Start;
        currency.CWIF_Start = CWIF_Start;
        currency.donate = donate;
        return currency;
    },

    name: function() {
        return janin.selectedCurrency.name;
    },

    networkVersion: function() {
        return janin.selectedCurrency.networkVersion;
    },

    privateKeyPrefix: function() {
        return janin.selectedCurrency.privateKeyPrefix;
    },

    WIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.WIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$");
    },

    CWIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.CWIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$");
    },

    // Switch currency
    useCurrency: function(index) {
        janin.selectedCurrency = janin.currencies[index];

        var coinImgUrl = "logos/" + janin.currency.name().toLowerCase() + ".png";
        document.getElementById("coinLogoImg").src = coinImgUrl;

        // Update title depending on currency
        document.title = janin.currency.name() + " " + ninja.translator.get("title");
        document.getElementById("siteTitle").alt = janin.currency.name() + " " + ninja.translator.get("title");

        // Update i18n link
        document.getElementById("cultureen").href = "?culture=en&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturefr").href = "?culture=fr&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturede").href = "?culture=de&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturenl").href = "?culture=nl&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturept").href = "?culture=pt&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureru").href = "?culture=ru&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturees").href = "?culture=es&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureua").href = "?culture=ua&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturetr").href = "?culture=tr&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureit").href = "?culture=it&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturepl").href = "?culture=pl&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturezh").href = "?culture=zh&currency=" + janin.currency.name().toLowerCase();

        if(ninja.seeder.isDone())
        {
            // Regenerate a new wallet when not expensive
            ninja.wallets.singlewallet.generateNewAddressAndKey();
            ninja.wallets.paperwallet.build(document.getElementById('paperpassphrase').value);
            ninja.wallets.brainwallet.view();
        }

        // Reset wallet tab when expensive or not applicable
        document.getElementById("bulktextarea").value = "";
        document.getElementById("suppliedPrivateKey").value = "";

        // easter egg doge ;)
        if(janin.currency.name() == "Dogecoin")
        {
            janin.doge = new Doge(['wow', 'so paper wallet', 'such random', 'very pretty', 'much design', 'awesome', 'much crypto', 'such coin', 'wow!!', 'to da moon']);
            return;
        }

        if(janin.doge != null)
        {
            janin.doge.stop();
            janin.doge = null;
        }
    },
};

janin.currencies = [
    //                              name, 		networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate
    janin.currency.createCurrency ("Aevo",                0x17, 0x99, "6",    "A"     , ""),
	janin.currency.createCurrency ("Astra",               0x17, 0x53, "3",    "D"    , ""),
    janin.currency.createCurrency ("Axe",                 0X37, 0xcc, "7",    "X"    , ""),
    janin.currency.createCurrency ("Biblepay",            0x19, 0xb6, "7",    "[TU]" , ""),
    janin.currency.createCurrency ("Bitcoin",             0x00, 0x80, "5",    "[LK]" , ""),
    janin.currency.createCurrency ("BitcoinCash",         0x00, 0x80, "5",    "[LK]" , ""),
    janin.currency.createCurrency ("Blackcoin",           0x19, 0x99, "6",    "P"    , ""),
    janin.currency.createCurrency ("Dash",                0x4c, 0xcc, "7",    "X"    , ""),
    janin.currency.createCurrency ("Dimecoin",            0x0f, 0x8f, "5",    "N"    , ""),
    janin.currency.createCurrency ("Dogecoin",            0x1e, 0x9e, "6",    "Q"    , ""),
	janin.currency.createCurrency ("DRV",                 0x1e, 0x31, "2",    "8"    , ""),
	janin.currency.createCurrency ("GloveCoin",		      0x26, 0xa6, "6",    "R" , ""),
    janin.currency.createCurrency ("LBRY Credits",        0x55, 0x80, "5",    "[LK]" , ""),
    janin.currency.createCurrency ("Litecoin",            0x30, 0xb0, "6",    "T"    , ""),
    janin.currency.createCurrency ("MoonCoin",            0x03, 0x83, "5",    "L"    , ""),
    janin.currency.createCurrency ("Myriadcoin",          0x32, 0xb2, "6",    "T"    , ""),
    janin.currency.createCurrency ("NYC",                 0x3c, 0xbc, "7",    "U"    , ""),
    janin.currency.createCurrency ("Peercoin",            0x37, 0xb7, "7",    "U"    , ""),
    janin.currency.createCurrency ("PIVX",                0x1e, 0xd4, "8",    "Y"    , ""),
    janin.currency.createCurrency ("Reddcoin",            0x3d, 0xbd, "7",    "[UV]" , ""),
                   ];
