// Option if I get an array of readings
    // function RemainingTime(t2) {
    //     const t1 = new Date().getTime();
    //     let ts = (t1 - t2.getTime()) / 1000;

    //     var d = Math.floor(ts / (3600 * 24));
    //     var h = Math.floor(ts % (3600 * 24) / 3600);
    //     var m = Math.floor(ts % 3600 / 60);
    //     var s = Math.floor(ts % 60);

    //     console.log(d, h, m, s)

    // }
    // const newtemparr = temparr.sort((a, b) =>
    //     temparSort(a, b) ? -1 : 1)
    // function temparSort(a, b) {
    //     if ((a.status == "high" && b.status == "high") ||
    //         (a.status == "medium" && b.status == "medium") ||
    //         (a.status == "low" && b.status == "low"))
    //         if (RemainingTime(new Date(a.date_time)) < RemainingTime(new Date(b.date_time))) {
    //             console.log(newtemparr)
    //             return true
    //         }
    //         else {
    //             console.log(newtemparr)
    //             return false
    //         }
    //     if (a.status == "high" || b.status == "low") {
    //         console.log(newtemparr)
    //         return true
    //     }
    //     else {
    //         console.log(newtemparr)
    //         return false
    //     }
    // }