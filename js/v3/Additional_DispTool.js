async function marker_data_check(log){//28,29
    if(log[2] === 'Delete' &&log[4] === '0000'){
        //置き換えの削除
        return null;
    }
    let type = "unknown";
    if (log[0] === '29') {//Target Marker
        type = 'marker';
    }else if(log[0] === '28'){//Field Marker
        //No work 
        type = 'field';
    }
    else{
        return null;
    }
    //name check
    let data = {
        source:log[0],
        target:Number(log[3]),
        add:log[2],
        From:log[5],
        From_Job:"",
        FromID:log[4],
        To:log[7],
        To_Job:"",
        ToID:log[6],
        time:Date.parse(log[1])
    }
    if (data.FromID !== ""){
        let Player_From = await get_ID_to_NameJob(data.FromID);
        if (data.From === "") {
            data.From = Player_From.name;
        }
        data.From_Job = Player_From.job;
    }
    if (data.ToID !== ""){
        let Player_To = await get_ID_to_NameJob(data.ToID);
        if (data.To === "") {
            data.To = Player_To.name;
        }
        data.To_Job = Player_To.job;
    }
    console.log(data);
    sendBC("targetlog",data);
}