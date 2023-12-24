// Option if I get an array of readings

    function RemainingTime(t2) {
        const t1 = new Date().getTime();
        let ts = (t1 - t2.getTime()) / 1000;

        var d = Math.floor(ts / (3600 * 24));
        var h = Math.floor(ts % (3600 * 24) / 3600);
        var m = Math.floor(ts % 3600 / 60);
        var s = Math.floor(ts % 60);

        console.log(d, h, m, s)

    }
    export function mysort(temparr) {
    
    const newtemparr = temparr.sort((a, b) =>
        temparSort(a, b) ? -1 : 1)
    function temparSort(a, b) {
        if ((a.level == "Hard" && b.level == "Hard") ||
            (a.level == "Medium" && b.level == "Medium") ||
            (a.level == "Easy" && b.level == "Easy"))
            if (RemainingTime(new Date(a.date)) < RemainingTime(new Date(b.date))) {
                console.log(newtemparr)
                return true
            }
            else {
                console.log(newtemparr)
                return false
            }
        if (a.level == "Hard" || b.level == "Easy") {
            console.log(newtemparr)
            return true
        }
        else {
            console.log(newtemparr)
            return false
        }
    }
    
}