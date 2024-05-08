let profile_ids = [] 
let QYprofile_ids=[]
let playerdata = []
let obj =[]
let matches=[]
let QYmatchs=[]
let matchids=[]
let upmatches=[]
let newmatches=[]
let maptypes =[]
let players=[]
let tplayers=[]
let tmatches=[]
function getqyteable(){
  profile_ids = [] 
  QYprofile_ids=[]
  playerdata = []
  obj =[]
  matches=[]
  QYmatchs=[]
  tplayers=[]
  tmatches=[]
  players =[]
  const url = 'https://app.teable.cn/api/table/tblNAl03pcmuuM78OMc/record?cellFormat=json&fieldKeyType=name&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=200&skip=0';
  const url2 = 'https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record?cellFormat=json&fieldKeyType=name&viewId=viwcrfVLNvWXGDuWiEC&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=1000&skip=2000';
  const url3 = 'https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record?cellFormat=json&fieldKeyType=name&viewId=viwcrfVLNvWXGDuWiEC&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=1000&skip=0';
  const url4 = 'https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record?cellFormat=json&fieldKeyType=name&viewId=viwcrfVLNvWXGDuWiEC&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=1000&skip=1000';
  const options = {method: 'GET', headers: {Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c='}};
  
  try {
    const response =  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(playersJson) {
  
      playersJson.records.forEach((p)=>{
        p.fields.newqrating=p.fields.qrating
        p.fields.id=p.id
        p.fields['on']=null
        obj.push(p.fields)
        if(p.fields.status!=3){
          QYprofile_ids.push(p.fields['profile_id'])
        }
        if(p.fields.status!=3 && p.fields.status!=2){
          players.push(p.fields['profile_id'])
        }
        tplayers.push({profile_id:p.fields.profile_id,name:p.fields.name,games:0,wins:0,qrating:0,newqrating:0,elo:0})
      })
      
      console.log(obj);
      const response2 =  fetch(url2, options).then(function(response) {
        return response.json();
      }).then(function( matchesJson) {
        const response3 =  fetch(url3, options).then(function(response) {
          return response.json();
        }).then(function( matchesJson1) {
          const response4 =  fetch(url4, options).then(function(response) {
            return response.json();
          }).then(function( matchesJson2) {

        matchesJson.records.forEach((m)=>{
          m.fields.matchinfo=JSON.parse(m.fields.matchinfo)
          m.fields.matchinfo.teableid=m.id
          matches.push(m.fields.matchinfo)
          
        })
        matchesJson1.records.forEach((m)=>{
          m.fields.matchinfo=JSON.parse(m.fields.matchinfo)
          m.fields.matchinfo.teableid=m.id
          matches.push(m.fields.matchinfo)
          
        })
        matchesJson2.records.forEach((m)=>{
          m.fields.matchinfo=JSON.parse(m.fields.matchinfo)
          m.fields.matchinfo.teableid=m.id
          matches.push(m.fields.matchinfo)
          
        })
        matches.sort(function(a, b){return a.match_id - b.match_id})
        console.log(matchesJson);
        oinsertLiveGames(matches)
        matches.forEach((match) => {
              
          matchids.push(match.match_id)
          if(4<new Date().getHours() && new Date().getHours()<14){
          if((new Date().getTime()-new Date(match['started']).getTime())<24*60*60*1000){
           tmatches.push(match)
          }
         }
         else if(new Date().getHours()<=4 || new Date().getHours()>=14){
           if((new Date().getTime()-new Date(match['started']).getTime())<12*60*60*1000){
            tmatches.push(match)
           }
          }
       
        })
        tmatches.forEach((match) => {
          match.teams.forEach((team) => {
            team.forEach((p) => { 
              for(t in tplayers){
                if(tplayers[t].profile_id==p.profile_id && (new Date(match['finished']).getTime()-new Date(match['started']).getTime())>=600000){
                tplayers[t].games++
                if(p.won){tplayers[t].wins++}
                if(tplayers[t].qrating==0){tplayers[t].qrating=p.qrating}
                tplayers[t].newqrating=p.newqrating
                tplayers[t].elo=tplayers[t].elo+p.qelo
              }
            }
            })
          })
         })

        playerdata=obj
        playerdata.sort(function(a, b){return b.date-a.date})
        getprofile_ids(playerdata)
        upprofile_ids(playerdata) 
        eloids(tplayers)
        $('#newdatef').html("最新"+matches.length+"局;时间"+new Date(matches[matches.length-1]['started']).toLocaleString());
        if(4<new Date().getHours()<=14){
          $('#newelo').html("(昨日+"+tmatches.length +")") 
          }
         if(new Date().getHours()<=4 || new Date().getHours()>14){
          $('#newelo').html("(今日+"+tmatches.length +")") 
          }
         $('#playerssum').html("("+players.length +")")
        $('#leaderboard-table').DataTable({
          "autoWidth": false,
          "order": [[3, 'desc'],[ 1, 'desc']],
          "searching": false, 
          "destroy": true,  
          "paging": false
        }); 
        $('#elo-table').DataTable({
          "autoWidth": false,
          "order": [[2, 'desc'],[ 1, 'desc']],
          "searching": false, 
          "destroy": true,  
          "paging": false
        });   
      })
      })
    })
      console.log(obj);
  
    })
  } catch (error) {
    console.error(error);
  }
  }
getqyteable()
function eloids(tplayers) {
  if(tplayers.length>0){
  for (var i=0;i<tplayers.length;i++){
      if(tplayers[i].games>0 ){
        $("#elopids").append("<tr id = elopids"+tplayers[i].profile_id+"></tr>");
        $("#elopids"+tplayers[i].profile_id).html(
        "<td style='width: 80px;'>"+tplayers[i].name+
        "</td><td style='width: 30px;'>"+tplayers[i].newqrating+
        "</td><td style='width: 30px;'>"+tplayers[i].elo+
        "</td><td style='width: 30px;'>"+tplayers[i].games+
        "</td><td style='width: 30px;'>"+tplayers[i].wins+
        "</td><td style='width: 30px;'>"+(tplayers[i].games-tplayers[i].wins)+
        "</td><td style='width: 30px;'>"+(tplayers[i].wins/tplayers[i].games*100).toFixed(0)+"%</td>")
    }
  }}}

      
function getprofile_ids(playerdata) {
    profile_ids=[]
    playerdata.forEach(player=> {profile_ids.push(player.profile_id)})
    return profile_ids
} 
function matchQY() {
    
  matches.forEach((match)=>{
    var l =0
   
    match.teams[0].forEach((p)=>{
      if(QYprofile_ids.includes(p.profile_id)){
                   l++;
                }
    })
    match.teams[1].forEach((p)=>{
      if(QYprofile_ids.includes(p.profile_id)){
                   l++;
                }
    })
    
    if(l==8){
      QYmatchs.push(match)
     }
  })  }
function getdate(date){
  var change = new Date(date);
  var Y = change.getFullYear() + "-";

var M = (change.getMonth() + 1 < 10 ? "0" + (change.getMonth() + 1) : change.getMonth() + 1) + "-";

var D= (change.getDate() < 10 ? "0" + (change.getDate()) : change.getDate()) + " ";

var h= (change.getHours() < 10 ? "0" + (change.getHours()) : change.getHours()) + ":";

var m= (change.getMinutes() < 10 ? "0" + (change.getMinutes()) : change.getMinutes()) + ":";

var s= (change.getSeconds() < 10 ? "0" + (change.getSeconds()) : change.getSeconds());

var newDate = Y + M + D + h + m + s;
return newDate
}
  
function upprofile_ids(playerdata) {
  for (var i=0;i<playerdata.length;i++){
      


      if(playerdata[i].status!=3 && playerdata[i].status!=2 ){
        var newprofile_ides=playerdata.filter((res)=>res.qrating==playerdata[i].profile_id)
        var nametxt =""
        if(newprofile_ides.length>0){
          for(var j=0; j<newprofile_ides.length;j++){
            nametxt+='<li><a class="dropdown-item" href="https://aoe2companion.com/profile/'+newprofile_ides[j].profile_id+'" target="_blank" rel="noopener norefferrer">马甲—'+newprofile_ides[j].name+'</a></li>'
          }
        }
        //console.log(newprofile_ides)
        $("#pids").append("<tr id = pids"+playerdata[i].profile_id+"></tr>");
        $("#pids"+playerdata[i].profile_id).html("<td style='width: 10px;'>"+
        '<div class="dropdown">'+
        '<input type= "Button" class="zone-mini-button" name ="'+playerdata[i].profile_id+'"id="button'+playerdata[i].profile_id+'" value=">" onClick ="addlooby(this)"/>'+
        '<a  class="dropdown-toggle" data-bs-toggle="dropdown" href="#" >'+playerdata[i].name+
        '</a><ul class="dropdown-menu">'+
            '<li><a class="dropdown-item" href="https://aoe2companion.com/profile/'+playerdata[i].profile_id+'" target="_blank" rel="noopener norefferrer">AoE II Companion</a></li>'+
            '<li><a class="dropdown-item" href="https://www.ageofempires.com/stats/?profileId='+playerdata[i].profile_id+'&game=age2&matchType=3/" target="_blank" rel="noopener norefferrer">AgeOfEmpires</a></li>'+
            '<li><a class="dropdown-item" href="https://aoe2.net/#aoe2de-profile-'+playerdata[i].profile_id+'" target="_blank" rel="noopener norefferrer">aoe2.net</a></li>'+
            '<li><a class="dropdown-item" href="qy.html?id='+playerdata[i].profile_id+'" target="_blank" rel="noopener norefferrer">QY4v4</a></li>'
            +((playerdata[i].bilibili==null)?"":'<li><a class="dropdown-item" href="https://live.bilibili.com/'+playerdata[i].bilibili+'" target="_blank" rel="noopener norefferrer">BILI直播</a></li>')
            +((playerdata[i].douyu==null)?"":'<li><a class="dropdown-item" href="https://www.douyu.com/'+playerdata[i].douyu+'" target="_blank" rel="noopener norefferrer">斗鱼直播</a></li>')
            +nametxt+
        "</ul></div></td><td style='width: 20px;'>"+
        "<span id=qrn"+playerdata[i].profile_id+">"+playerdata[i].newqrating.toFixed(0)+
        "</span></td><td style='width: 20px;'><span id=q1v1"+playerdata[i].profile_id+">"+ (playerdata[i].wins/playerdata[i].games*100).toFixed(0)+
        "%</span></td><td style='width: 140px;'><span id=qdate"+playerdata[i].profile_id+">"+ getdate(playerdata[i].date)+
        "</span></td>");
    }
};
}

const ArraytoObj = (keys = [], values = []) => {
        if (keys.length === 0 || values.length === 0) return {};
        const len = keys.length > values.length ? values.length : keys.length;
        const obj = {};
        for (let i = 0; i < len; ++i) {
            obj[keys[i]] = values[i]
        }
        return obj;
    };

   
const dbTojson = (_data = {}) => {
        let _res = [];
        _data.map(function (item) {
            
                _res.push(JSON.parse(item));
            
        });
        return _res;};

const dbToObj = (_data = {}) => {
        let _res = [];
        _data.map(function (item) {
            let _columns =item.columns;
            item.values.map(function (values) {
                _res.push(ArraytoObj(_columns, values));
            });
        });
        return _res;
    };

function ofs(profile_id){
    let a= obj.find((ele) => {
          return ele.profile_id==profile_id
        })

          if (a==undefined){
              return 1600
          }
          else{
              return a
          }
    }

let onid=[]

function getunrankmatches(profile_ids){
  setTimeout(function(){ $('#newdatef').html("更新中....") }, 0);
  var d1=new Date().getTime();
  var d2=new Date(matches[matches.length-1]['started']).getTime()
  var time = Math.round((d1-d2)/(1000*60*60*24))+1
  //var time = 5
  console.log(time,matches[matches.length-1].match_id)
  var resultmatches=[]
 
    $.ajaxSettings.async = false;
    
  for(var i=1;i<=time;i++){
    
  var roomurl ="https://data.aoe2companion.com/api/matches?profile_ids="+profile_ids+"&search=&leaderboard_ids=unranked&page="+i;     
  $.get(roomurl, function (res) {
       var result = res.matches;
       
       resultmatches=resultmatches.concat(result)
       console.log(resultmatches)
       
      })
        
       
      }
      $.ajaxSettings.async = true;
    
    
      
       console.log(resultmatches)
       resultmatches.sort(function(a, b){return a.matchId- b.matchId})
       
       
       
       resultmatches.forEach((match) => {
          
       if(matchids.includes(match.matchId)==false && matches[matches.length-1].match_id<match.matchId){
               
                var p=[]
                match['match_id']=match.matchId
                match['map_image_url']=match.mapImageUrl
                match['map_name']=match.mapName
                match['leaderboard_id']=match.leaderboardId
                match.players=[]
                match.teams1=[]
                match.teams1[0]=[]
                match.teams1[1]=[]
                if( match.teams.length==2){
                match.teams[0].players.forEach((player)=>{
                  player['profile_id']=player['profileId']
                  player['civ_name']=player['civName']
                  match.players.push(player)
                  match.teams1[0].push(player)
                 });
                match.teams[1].players.forEach((player)=>{
                  player['profile_id']=player['profileId']
                  player['civ_name']=player['civName']
                  match.players.push(player)
                  match.teams1[1].push(player)}
                   ); 
                 }
                 if( match.teams.length==1){
                   match.teams[0].players.forEach((player)=>{
                     player['profileId']=player.profile_id
                     player['civName']=player.civ_name
                     match.players.push(player)
                     match.teams1[0].push(player)
                    });
                   
                    }  
                match.players.forEach((player)=>{
                    if(profile_ids.includes(player.profile_id)){
                     
                       p.push(1)
                       }
                     else{
                       p.push(0)
                       }
                    });
                
               var psum =0
               p.forEach((pnumber)=>{psum +=pnumber})
               
                   
                    if(psum==8 && match.finished!=null && matchids.includes(match.matchId)==false){
                      matchids.push(match.matchId)
                             newmatches.push(match)
                             eloinsertLiveGames ([match])
                         }
                      
                 
             
           }
         })

         console.log(newmatches)
         matches = matches.concat(newmatches)
         newmatches=[]
         playerdata=obj
         upprofile_ids(playerdata) 
         setTimeout(function(){ $('#newdatef').html("最新"+matches.length+"局;时间"+new Date(matches[matches.length-1]['started']).toLocaleString()) }, 1000);
      
}


function matchelo(player,a,b,kFactor = 32) {
  if(player['won'] === null) {
    return [0,0]
  } else if (player['won'] === true){
    return elo([a,b],[1,0],kFactor)
  } else {
    return elo([b,a],[0,1],kFactor)
  }
}

const elo = ([a, b], [c,d],kFactor = 32) => {
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) => kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  return [Math.round(newRating(a, c)/4), Math.round(newRating(b, d)/4)];
};
function eloinsertLiveGames (pastGbMatches) {     
  pastGbMatches.forEach((match) =>  {
        const teams = match['teams1']
        const team1 = teams[0]
        const team2 = teams[1]
        const team1Player1 = teams[0][0]
        const team1Player2 = teams[0][1]
        const team1Player3 = teams[0][2]
        const team1Player4 = teams[0][3]
        const team2Player1 = teams[1][0]
        const team2Player2 = teams[1][1]
        const team2Player3 = teams[1][2]
        const team2Player4 = teams[1][3]
    if ((new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000 || team1Player1.won==null) {
        match['teams1'][0].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
  
              player.qrating=Number(ofs(player.profile_id).newqrating),player.qelo=0,player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
            match['teams1'][1].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
              player.qrating=Number(ofs(player.profile_id).newqrating),player.qelo=0,player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
    } else {
       
        let team1EloAvg = 0
        let team2EloAvg = 0 
        let team1Elo = 0
        let team2Elo = 0 
        team1.forEach((player) =>  {
            if(ofs(player.profile_id).status==2){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
            
        team1EloAvg = Math.floor(team1EloAvg)
        team2.forEach((player) =>  {
            if(ofs(player.profile_id).status==2){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
           
        team2EloAvg = Math.floor(team2EloAvg)
        if(match.match_id>192540768){
          let elo = matchelo(team1Player1,team1EloAvg,team2EloAvg,128)
          team1Elo = Number(elo[0])
          team2Elo = Number(elo[1])
          team1.forEach((player) =>  { 
           
            if(team1Elo>=0){
             
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team1Elo<0){
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
          team2.forEach((player) =>  {
             
              if(team2Elo>=0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team2Elo<0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
        }
        else{
          let elo = matchelo(team1Player1,team1EloAvg,team2EloAvg)
          team1Elo = Number(elo[0])
          team2Elo = Number(elo[1])
          team1.forEach((player) =>  { 
           
           
            player.qelo=Number(team1Elo)
            player.qrating=Number(ofs(player.profile_id).newqrating),
            player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
           
           ofs(player.profile_id).newqrating=player.newqrating
         })
         team2.forEach((player) =>  {
            
         
            player.qelo=Number(team2Elo)
            player.qrating=Number(ofs(player.profile_id).newqrating),
            player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
           
           ofs(player.profile_id).newqrating=player.newqrating
         })
  
        }
        let team1won = 0
        let team2won = 0
        if (team1[0].won==true){
          team1won = 1
          team2won = 0
        }
        else if(team1[0].won==false)
        {
          team1won = 0
          team2won = 1
        }
        
        team1.forEach((player) => {
          ofs(player.profile_id).newqrating=player.newqrating,
          
          ofs(player.profile_id).wins+=team1won,
          
          ofs(player.profile_id).loses+=team2won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).date= match.started
        })
        team2.forEach((player) =>  {
          ofs(player.profile_id).newqrating=player.newqrating,
         
          ofs(player.profile_id).wins+=team2won,
          
          ofs(player.profile_id).loses+=team1won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).date= match.started
        })
      }      
    });}

function oinsertLiveGames (pastGbMatches) {     
  pastGbMatches.forEach((match) =>  {
        const teams = match['teams']
        const team1 = teams[0]
        const team2 = teams[1]
        const team1Player1 = teams[0][0]
        const team1Player2 = teams[0][1]
        const team1Player3 = teams[0][2]
        const team1Player4 = teams[0][3]
        const team2Player1 = teams[1][0]
        const team2Player2 = teams[1][1]
        const team2Player3 = teams[1][2]
        const team2Player4 = teams[1][3]
    if ((new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000 || team1Player1.won==null) {
        match['teams'][0].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
  
              player.qrating=Number(ofs(player.profile_id).newqrating),player.qelo=0,player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
            match['teams'][1].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
              player.qrating=Number(ofs(player.profile_id).newqrating),player.qelo=0,player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
    } else {
       
        let team1EloAvg = 0
        let team2EloAvg = 0 
        let team1Elo = 0
        let team2Elo = 0 
        team1.forEach((player) =>  {
            if(ofs(player.profile_id).status==2){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
            
        team1EloAvg = Math.floor(team1EloAvg)
        team2.forEach((player) =>  {
            if(ofs(player.profile_id).status==2){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
           
        team2EloAvg = Math.floor(team2EloAvg)
        if(match.match_id>192540768){
          let elo = matchelo(team1Player1,team1EloAvg,team2EloAvg,128)
          team1Elo = Number(elo[0])
          team2Elo = Number(elo[1])
          team1.forEach((player) =>  { 
           
            if(team1Elo>=0){
             
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team1Elo<0){
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
          team2.forEach((player) =>  {
             
              if(team2Elo>=0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team2Elo<0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
        }
        else{
          let elo = matchelo(team1Player1,team1EloAvg,team2EloAvg)
          team1Elo = Number(elo[0])
          team2Elo = Number(elo[1])
          team1.forEach((player) =>  { 
           
           
            player.qelo=Number(team1Elo)
            player.qrating=Number(ofs(player.profile_id).newqrating),
            player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
           
           ofs(player.profile_id).newqrating=player.newqrating
         })
         team2.forEach((player) =>  {
            
         
            player.qelo=Number(team2Elo)
            player.qrating=Number(ofs(player.profile_id).newqrating),
            player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
           
           ofs(player.profile_id).newqrating=player.newqrating
         })
  
        }
        let team1won = 0
        let team2won = 0
        if (team1[0].won==true){
          team1won = 1
          team2won = 0
        }
        else if(team1[0].won==false)
        {
          team1won = 0
          team2won = 1
        }
        
        team1.forEach((player) => {
          ofs(player.profile_id).newqrating=player.newqrating,
          
          ofs(player.profile_id).wins+=team1won,
          
          ofs(player.profile_id).loses+=team2won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).date= match.started
        })
        team2.forEach((player) =>  {
          ofs(player.profile_id).newqrating=player.newqrating,
         
          ofs(player.profile_id).wins+=team2won,
          
          ofs(player.profile_id).loses+=team1won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).date= match.started
        })
      }      
    });}

function filterpidMatches(profile_ids,match_id,Matches) {
     Matches.forEach((match) => {
        let p =[]
        if(match['finished']  === null){
          console.log(match)
          }
        else if (match.leaderboard_id=='unranked' && match.match_id>match_id){
          console.log(match)
             match.teams[0].forEach((player)=>{
            if(profile_ids.includes(player.profile_id)){
                p.push(1)
            }
            else{
                p.push(0)
            }
           
             });
             match.teams[1].forEach((player)=>{
              if(profile_ids.includes(player.profile_id)){
                  p.push(1)
              }
              else{
                  p.push(0)
              }
             
               });
             var psum =0
             p.forEach((pnumber)=>{psum +=pnumber})
             
          if (psum==8) {
             
            upmatches.push(match)

          }
          }
          }); 
    }
function combination(arr,size,n){	
//定义数组保存结果
        var result = []
        var newresult = []
	    
//selected数组包含已经选中的元素
//arr数组包含未选中元素数组，size表示还需选取元素的个数
        function _combine(selected,arr,size){
            //如果size===0，则一次组合完成，存入result数组并返回
            if(size===0){
                result.push(selected)
                return
            }
            //遍历所有可能选中的元素，遍历的次数为数组长度减去(size-1)
            for(let i =0;i<arr.length-(size-1);i++){
                //复制数组，避免对selected数组数据的更改
                let temp = selected.slice()
                temp.push(arr[i]) 
                _combine(temp,arr.slice(i+1),size-1)
            }
            
        }

        _combine([], arr, size);
        function sumqrating(arr){
            let sum =0
        for(let i =0;i<arr.length;i++){
           sum += arr[i]["qrating"]
        }
        return sum
       }
        for(let i =0;i<n;i++){
            let elo = Math.abs(sumqrating(result[i])-sumqrating(result[2*n-1-i]))
            newresult.push({'team1':result[i],'team2':result[2*n-1-i],'team1elo':sumqrating(result[i]),'team2elo':sumqrating(result[2*n-1-i]),'elo':elo})
        }
        newresult.sort(function(a, b){return a.elo - b.elo})
        return  newresult;
    }