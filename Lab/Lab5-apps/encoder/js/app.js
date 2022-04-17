var app = new Vue({
    el: '#baseband-encoder',
    data: {
        bits: [],
        ManchesterLevelEncoding: [],
        NRZS: [],
        NRZL: [],
        NRZM: [],
        RZ: [],
        BL: [],
        BM: [],
        BS: [],
        Delay: [],
        BLDiff: [],
        status: '',
        numberOfBits: 8,
        validateBit: validateBit
    },
    created: function () {
        this.bits = getBitstream(this.numberOfBits);
    },
    methods: {
        encode: function(){
            this.ManchesterLevelEncoding = getManchesterLevelEncoding(this.bits);
            this.NRZL = getNRZL(this.bits);
            this.NRZS = getNRZS(this.bits);
            this.NRZM = getNRZM(this.bits);
            this.RZ = getRZ(this.bits);
            this.BL = getBL(this.bits);
            this.BM = getBM(this.bits);
            this.BS = getBS(this.bits);
            this.Delay = getDelay(this.bits);
            this.BLDiff = getBLDiff(this.bits);
        }
    }
})


