let obj =[]
let matchs=[]
let idmatchs = []
let idmatchs1v1 = []
let profile_ids =[]
let QYprofile_ids=[]
let playerdata = []
let matches=[]
let QYmatchs=[]
let matchids=[]
let upmatches=[]
let newmatches=[]
let maptypes =[]
let players=[]
let tplayers=[]
let tmatches=[]
let ptotal = []
let civs={'games':[],'wins':[]}
let idcivs={}
let idmaps={'games':[],'wins':[]}
let sumidmaps={}
let idrating =[]
    // 读取数据库数据
//function upobmatchs(){
   
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
          matchs.push(m.fields.matchinfo)
          
        })
        matchesJson1.records.forEach((m)=>{
          m.fields.matchinfo=JSON.parse(m.fields.matchinfo)
          m.fields.matchinfo.teableid=m.id
          matchs.push(m.fields.matchinfo)
          
        })
        matchesJson2.records.forEach((m)=>{
          m.fields.matchinfo=JSON.parse(m.fields.matchinfo)
          m.fields.matchinfo.teableid=m.id
          matchs.push(m.fields.matchinfo)
          
        })
        matchs.sort(function(a, b){return a.match_id - b.match_id})
        console.log(matchs);
        
        matchs.forEach((match) => {
          matchids.push(match.match_id)
        })
        obj.sort(function(a, b){return b.date-a.date})
            
            obj.forEach((player) => {
              
              player['newqrating'] =player['qrating']})

                 oinsertLiveGames (matchs)
                 
                 
                 console.info(matchs)
                 searchplayer(id,matchs)
                 console.info(idmatchs)
                 oLiveGames (idmatchs)
                 filterpMatches(idmatchs,obj,id)
                 console.info(obj);
                 var ncivs=[]
                 var newcivs={}
                 civs.games.forEach((civ)=>{
                        function checkname(name) {
                   return name ==civ;
                   }
                   
                   newcivs[civ]={}
                   newcivs[civ]['games']=civs.games.filter(checkname).length
                   newcivs[civ]['wins']=civs.wins.filter(checkname).length
                   newcivs[civ]['wg']=(newcivs[civ]['wins']*100/newcivs[civ]['games']).toFixed(0)
                  
                 })

                 for (civ in newcivs){
                    ncivs.push({"civ_name":civ,'games':newcivs[civ]['games'],'wins':newcivs[civ]['wins'],"wg":newcivs[civ]['wg']})
                  }
                  ncivs.sort(function(a, b){if(a.games >=5 && b.games >=5){
	            			return b.wg - a.wg
	               		}else{
		            		return b.games - a.games
		            	}})
                 var nmaps=[]
                 var newmaps={}
                 idmaps.games.forEach((map)=>{
                  
                        function checkname(name) {
                   return name ==map;
                   }
                   newmaps[map]={}
                   newmaps[map]['games']=idmaps.games.filter(checkname).length
                   newmaps[map]['wins']=idmaps.wins.filter(checkname).length
                   newmaps[map]['wg']=(newmaps[map]['wins']*100/newmaps[map]['games']).toFixed(0)
                  
                 })
                 for (map in newmaps){
                    nmaps.push({"map_name":map,'games':newmaps[map]['games'],'wins':newmaps[map]['wins'],"wg":newmaps[map]['wg']})
                  }
                  nmaps.sort(function(a, b){if(a.games >=5 && b.games >=5){
	            			return b.wg - a.wg
	               		}else{
		            		return b.games - a.games
		            	}})
                  ptotal.sort(function(a, b){return b.games - a.games}) 

                 ncivs.forEach((civ)=>{
                  $(".idcivs").append('<dt><img src="Civs/'+civ['civ_name'].toLowerCase()+'.png"  class="rounded-circle" width="30">'+civ['civ_name']+':  '+civ['games']+"/"+civ['wins']+"/"+civ['wg']+"%   </dt>");
                 })
                 nmaps.forEach((map)=>{
                  $(".idmaps").append('<dt>'+map['map_name']+":  "+map['games']+"/"+map['wins']+"/"+map['wg']+"%   </dt>");
                 })
                 console.info(ptotal);
                 console.log(ncivs) 
                 console.log(nmaps) 
let data1={}

idrating.sort(function(a, b){return b.started - a.started})

for(var i=0;i<idrating.length;i++){
    data1[idrating[i].started]=idrating[i].qrating
}

const data = {
    datasets: [{
     label: '[QingY]Elo',
     borderColor: "rgba(200,200,200,1.000)",
     backgroundColor: "rgba(200,200,200,1.000)",
     data: data1,
    }]
  };

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
                distribution: 'series'
      }
        }
       
    }
  };

const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
                 ptotal.forEach((player) => {
                     if(ofs(player['id']).status!=2){
        document.querySelector('.player-table-body').insertAdjacentHTML("beforeend",`<tr id = pid${player['id']}>
          <td scope="row" class=" link-light left-align player-name leaderboard-player" style="width: 220px"><a href='qy.html?id=${player.id}'>${ofs(player.id).name}</a></td>
          <td class="leaderboard-elo">${ofs(player.id).newqrating}</td>
          <td class="leaderboard-elo"><span id = games${player['id']}>${player['games']}</span></td>
          <td class="leaderboard-elo"><span id = wins${player['id']}>${player['wins']}</span></td>
          <td class="leaderboard-elo"><span id = loses${player['id']}>${player['loses']}</span></td>
          <td class="leaderboard-elo"><span id = uns${player['id']}>${player['un']}</span></td>
          <td class="leaderboard-elo"><span id = wl${player['id']}>${player['k']}%</span></td>
          <td class="leaderboard-elo"><span id = twins${player['id']}>${player['twins']}</span></td>
          <td class="leaderboard-elo"><span id = tloses${player['id']}>${player['tloses']}</span></td>
          <td class="leaderboard-elo"><span id = twl${player['id']}>${player['tk']}%</span></td>
          <td class="leaderboard-elo"><span id = owins${player['id']}>${player['owins']}</span></td>
          <td class="leaderboard-elo"><span id = oloses${player['id']}>${player['oloses']}</span></td>
          <td class="leaderboard-elo"><span id = twl${player['id']}>${player['lk']}%</span></td>
          <td class="leaderboard-elo"><span id = owl${player['id']}>${player['ok']}%</span></td>
          <td class="leaderboard-elo"><span id = ky${player['id']}>${player['ky']}%</span></td>
        </tr>`
        );}
        })
        
        $(".idplayer").html(ofs(id).name);    
        $("#idqranting").html(ofs(id).newqrating);
        $("#idgames").html(ofs(id).games);        
        $("#idwl").html((ofs(id).wins*100/ofs(id).games).toFixed(0)+"%");
    

$(".loading-div").hide();
$('body').css('overflow-y','scroll');
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[2] ) || 0; // use data for the age column
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);
 
$(document).ready(function() {
    var table = $('#leaderboard-table').DataTable();
 
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').keyup( function() {
        table.draw();
    } );
} );  
        })
      })
    })
  })
  
} catch (error) {
  console.error(error);
  
}
//} 

    // 方法传入两个数组，第一个数组为key，第二个数组对应位置为value，此方法在Python中为zip()函数。
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
        return _res;
    };
    // 读取数据库
    // 1.把columns转化为驼峰；
    // 2.把columns和values进行组合；
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
          return ele.profile_id==profile_id})
    if (a==undefined){
      return 1600
    }
    else{
      return a
    }
}
function searchplayer(id,matchs){
  matchs.forEach((match) => {
              var teams = match.teams
              if(teams.length==1 ){
                for (i in teams[0]){
                  if(teams[0][i].profile_id==Number(id))
                  {
                    idmatchs1v1.push(match)
                  }
                }
              }
              else{
              for (i in teams[0]){
                if(teams[0][i].profile_id==Number(id))
                {
                  idmatchs.push(match)
                }
              }
              for (i in teams[1]){
                if(teams[1][i].profile_id==Number(id))
                {
                  idmatchs.push(match)
                }
              }}
            })

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


function oinsertLiveGames (pastGbMatches) {  
  pastGbMatches.sort(function(a, b){return a.match_id - b.match_id})   
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
        if ( (new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000) {
            match['teams'][0].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
  
              player.qrating=Number(ofs(player.profile_id).newqrating),
              player.qelo=0,
              player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
            match['teams'][1].forEach((player) =>  { 
            if(ofs(player.profile_id).status==2){
                  player.profile_id = ofs(player.profile_id).qrating
              }
              player.qrating=Number(ofs(player.profile_id).newqrating),
              player.qelo=0,
              player.newqrating=Number(ofs(player.profile_id).newqrating)+0})
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
        
             if(match.match_id>192540768)
             {
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
        let team1streak =0
        let team2streak =0

        if (team1[0].won==true){
          team1won = 1
          team2won = 0
          team1streak =1
          team2streak =-1
        }
        else if(team1[0].won==false)
        {
          team1won = 0
          team2won = 1
          team1streak =-1
          team2streak =1
        }
        else{
          team1won = 0
          team2won = 0
          team1streak =0
          team2streak =0
        }
        
        team1.forEach((player) => {
             if ((ofs(player.profile_id).streak>=0 && team1streak==1) || (ofs(player.profile_id).streak<=0 && team1streak==-1) ){
            ofs(player.profile_id).streak += team1streak
          }
          else if ((ofs(player.profile_id).streak>=0 && team1streak==-1) || (ofs(player.profile_id).streak<=0 && team1streak==1) ){
            ofs(player.profile_id).streak = team1streak
          }
            if (Math.abs(ofs(player.profile_id).streak) >= Math.abs(ofs(player.profile_id).streakest )){
            ofs(player.profile_id).streakest =ofs(player.profile_id).streak
          }
        
          
          ofs(player.profile_id).wins+=team1won,
          
          ofs(player.profile_id).loses+=team2won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses

        })
        team2.forEach((player) =>  {
           if ((ofs(player.profile_id).streak>=0 && team2streak==1 )|| (ofs(player.profile_id).streak<=0 && team2streak==-1 )){
            ofs(player.profile_id).streak += team2streak
          }
          else if ((ofs(player.profile_id).streak>=0 && team2streak==-1) || (ofs(player.profile_id).streak<=0 && team2streak==1) ){
            ofs(player.profile_id).streak = team2streak
          }
          if (Math.abs(ofs(player.profile_id).streak) >= Math.abs(ofs(player.profile_id).streakest )){
            ofs(player.profile_id).streakest =ofs(player.profile_id).streak
          }
          
         
          ofs(player.profile_id).wins+=team2won,
          
          ofs(player.profile_id).loses+=team1won,
          
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          
        })
      }      
    })}
    function oLiveGames1v1 (pastGbMatches) {
      document.querySelector('.completedgames').innerHTML="<p>从"+new Date(pastGbMatches[0]['started']).toLocaleDateString()+"至"+new Date(pastGbMatches[pastGbMatches.length-1]['started']).toLocaleDateString()+"局数("+ pastGbMatches.length+")"+"</p>"
      
      pastGbMatches.sort(function(a, b){return b.match_id - a.match_id})
      var sources = pastGbMatches
  
         var options = {
         dataSource: sources,
         pageSize:1,
         className: 'paginationjs-theme-blue paginationjs-big',
        callback: function (response, pagination) {
          window.console && console.log(response, pagination);
         
          
  
  
          var dataHtml = '';
          $.each(response, function (index, match) {
            const teams = match['teams']
            const team1 = [teams[0][0]]
            const team2 = [teams[0][1]]
           
          let team1EloAvg = 0
          let team2EloAvg = 0 
          team1.forEach((player) =>  {team1EloAvg += Number(player.qrating)
            
          })
          team1.sort(function(a, b){return a.color - b.color})
          team2.forEach((player) =>  {team2EloAvg += Number(player.qrating)
            
          })
          team2.sort(function(a, b){return a.color - b.color})
          var timegame =  Math.round((new Date(match['finished']).getTime()-new Date(match['started']).getTime())*1.7/60000)
          var net= `<a class="spectate-btn" href="https://www.aoe2insights.com/match/${match['match_id']}/analysis/" target="_blank" rel="noopener norefferrer">录像分析</a></p>`
          if (match['teams'].length == 0){
            
          } else if(match['teams'].length == 1) {
          var team1txt =""
          var team2txt =""
          for (i in team1){
            team1txt +=
            `<div class="team-game-player grid-container-team">
            <p class="player p${team1[i]['color']}">${team1[i]['color']}</p>
            <p class="player-name">${ofs(team1[i].profile_id)['name']}</p>
            <p><img src="Civs/${team1[i]['civ_name'].toLowerCase()}.png" class="rounded-circle" width="30"></p>
            
            <p>${team1[i]['qrating']}</p>
            <p>(${team1[i]['qelo']})</p>
            <p>${team1[i]['newqrating']}</p>
          </div>`
          }
          for(j in team2){
            team2txt +=
            `<div class="team-game-player grid-container-team ">
            <p class="player p${team2[j]['color']}">${team2[j]['color']}</p>
            <p class="player-name">${ofs(team2[j].profile_id)['name']}</p>
            <p><img src="Civs/${team2[j]['civ_name'].toLowerCase()}.png" class="rounded-circle" width="30"></p>
            
            <p>${team2[j]['qrating']}</p>
            <p>(${team2[j]['qelo']})</p>
            <p>${team2[j]['newqrating']}</p>
          </div>`
          }
          dataHtml +=`
          <div class="card shadow-sm">
          <div class="card-body">
          <div class="row">
            <div class="col-sm">
              <h4 class="text-center">Team 1${matchOutcome(teams[0][0])}</h4>
              ${team1txt}
            </div>
          <div class="col-sm">
              <h4 class="text-center">Team 2${matchOutcome(teams[0][1])}</h4>
             ${team2txt}
            </div>
        </div>
        <hr>
          <div class="row">
            <div class="col-sm">
              <p class="text-center">${match['map_name']} ${team1EloAvg}||${team2EloAvg}</p>
            </div>
            <div class="col-sm">
              <small class="text-muted">${new Date(match['started']).toLocaleString()}游戏时长 ${Math.round((new Date(match['finished']).getTime()-new Date(match['started']).getTime())*1.7/60000)} 分  ${net}</small>
              
            </div>
            <hr>
          </div></div></div>`
        }
        });
          $('#pagination-container').prev().html(dataHtml);
        }
      };
  
      //$.pagination(container, options);
  
      
      $('#pagination-container').pagination(options); 
      
          
       
    }    
function oLiveGames (pastGbMatches) {
    document.querySelector('.completedgames').innerHTML="<p>从"+new Date(pastGbMatches[0]['started']).toLocaleDateString()+"至"+new Date(pastGbMatches[pastGbMatches.length-1]['started']).toLocaleDateString()+"局数("+ pastGbMatches.length+")"+"</p>"
    
    pastGbMatches.sort(function(a, b){return b.match_id - a.match_id})
    var sources = pastGbMatches

       var options = {
       dataSource: sources,
       pageSize:1,
       className: 'paginationjs-theme-blue paginationjs-big',
      callback: function (response, pagination) {
        window.console && console.log(response, pagination);
       
        


        var dataHtml = '';
        $.each(response, function (index, match) {
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
         if (match.teams.length>2) {
      
    } else {
        let team1EloAvg = 0
        let team2EloAvg = 0 
        team1.forEach((player) =>  {team1EloAvg += Number(player.qrating)
          
        })
        team1.sort(function(a, b){return a.color - b.color})
        team2.forEach((player) =>  {team2EloAvg += Number(player.qrating)
          
        })
        team2.sort(function(a, b){return a.color - b.color})
        var timegame =  Math.round((new Date(match['finished']).getTime()-new Date(match['started']).getTime())*1.7/60000)
        var net= `<a class="spectate-btn" href="https://www.aoe2insights.com/match/${match['match_id']}/analysis/" target="_blank" rel="noopener norefferrer">录像分析</a></p>`
        if (match['teams'].length == 0){
          
        } else if(match['teams'].length == 2) {
        var team1txt =""
        var team2txt =""
        for (i in team1){
          team1txt +=
          `<div class="team-game-player grid-container-team">
          <p class="player p${team1[i]['color']}">${team1[i]['color']}</p>
          <p class="player-name">${ofs(team1[i].profile_id)['name']}</p>
          <p><img src="Civs/${team1[i]['civ_name'].toLowerCase()}.png" class="rounded-circle" width="30"></p>
          
          <p>${team1[i]['qrating']}</p>
          <p>(${team1[i]['qelo']})</p>
          <p>${team1[i]['newqrating']}</p>
        </div>`
        }
        for(j in team2){
          team2txt +=
          `<div class="team-game-player grid-container-team ">
          <p class="player p${team2[j]['color']}">${team2[j]['color']}</p>
          <p class="player-name">${ofs(team2[j].profile_id)['name']}</p>
          <p><img src="Civs/${team2[j]['civ_name'].toLowerCase()}.png" class="rounded-circle" width="30"></p>
          
          <p>${team2[j]['qrating']}</p>
          <p>(${team2[j]['qelo']})</p>
          <p>${team2[j]['newqrating']}</p>
        </div>`
        }
        dataHtml +=`
        <div class="card shadow-sm">
        <div class="card-body">
        <div class="row">
          <div class="col-sm">
            <h4 class="text-center">Team 1${matchOutcome(team1Player1)}</h4>
            ${team1txt}
          </div>
        <div class="col-sm">
            <h4 class="text-center">Team 2${matchOutcome(team2Player1)}</h4>
           ${team2txt}
          </div>
      </div>
      <hr>
        <div class="row">
          <div class="col-sm">
            <p class="text-center">${match['map_name']} ${team1EloAvg}||${team2EloAvg}</p>
          </div>
          <div class="col-sm">
            <small class="text-muted">${new Date(match['started']).toLocaleString()}游戏时长 ${Math.round((new Date(match['finished']).getTime()-new Date(match['started']).getTime())*1.7/60000)} 分  ${net}</small>
            
          </div>
          <hr>
        </div></div></div>`
      }} 
      });
        $('#pagination-container').prev().html(dataHtml);
      }
    };

    //$.pagination(container, options);

    
    $('#pagination-container').pagination(options); 
    
        
     
  }
function fs(id)
  {
  var profile_ids=getprofile_ids(playerdata)
  if(profile_ids.includes(id)){
  for (var i=0;i<playerdata.length;i++){
    if (playerdata[i].profile_id==id){
       return i
    }
}
  }
  else{
return 0
  }

 }


   

function playerups(playerdata)
  {
playerdata.sort(function(a, b){return b.qrating - a.qrating})
playerdata.forEach((player) => {
        var url;
 
		url = window.location.href; /* 获取完整URL */
        if(url=="https://moloo.gitee.io/qyaoe/" && ofs(player['profile_id']).status==1){
            document.querySelector('.player-table-body').insertAdjacentHTML("beforeend",`<tr>
          <td scope="row" class="left-align player-name leaderboard-player  link-light" style="width: 220px"><a href='qy.html?id=${player.profile_id}'>${player['name']}</a></td>
          <td class="leaderboard-elo">${(player['qrating']*0.006-3).toFixed(1)}</td>
          <td class="leaderboard-elo">${player['qrating']}</td> 
          <td class="leaderboard-elo"><span id = pide${player['profile_id']}>${(player['newqrating']*0.006-3).toFixed(1)}</td>
          <td class="leaderboard-elo"><span id = pidr${player['profile_id']}>${player['newqrating']}</span></td>
          <td class="leaderboard-elo"><span id = pids${player['profile_id']}>${player['newqrating']-player['qrating']}</span></td>
          <td class="leaderboard-elo"><span id = games${player['profile_id']}>${player['games']}</span></td>
          <td class="leaderboard-elo"><span id = wins${player['profile_id']}>${player['wins']}</span></td>
          <td class="leaderboard-elo"><span id = loses${player['profile_id']}>${player['loses']}</span></td>
          <td class="leaderboard-elo"><span id = streak${player['profile_id']}>${player['streak']}</span></td>
          <td class="leaderboard-elo"><span id = streakest${player['profile_id']}>${player['streakest']}</span></td>
          <td class="leaderboard-elo"><span id = wl${player['profile_id']}>${(player.wins/player['games']*100).toFixed(0)+"%" }</span></td>
        </tr>`
        );
        }
        else if(url=="https://moloo.gitee.io/qyaoe/qy.html"){
        document.querySelector('.player-table-body').insertAdjacentHTML("beforeend",`<tr>
          <td scope="row" class="left-align player-name leaderboard-player  link-light" style="width: 220px"><a href='https://aoe2.net/#profile-${player.profile_id}'>${player['name']}</a></td>
          <td class="leaderboard-elo">${player['qrating']}</td>
          <td class="leaderboard-elo"><span id = pid${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = wins${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = twins${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = owins${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = loses${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = tloses${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = oloses${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = uns${player['profile_id']}>0</span></td>
          <td class="leaderboard-elo"><span id = wl${player['profile_id']}>0%</span></td>
          <td class="leaderboard-elo"><span id = twl${player['profile_id']}>0%</span></td>
          <td class="leaderboard-elo"><span id = owl${player['profile_id']}>0%</span></td>
          <td class="leaderboard-elo"><span id = ky${player['profile_id']}>0%</span></td>
        </tr>`
        );
        }
    
      })
      return "ok"
  }
      



 

  function addZero(i){
    if (i<10) {
      i="0" + i;
    }
    return i;
  }


  

let mapTypes = {}
let mapSizes = {}
let gameTypes = {}
let leaderboardTypes = {}
let timeNow = Math.floor(Date.now()/1000)
let thirtyMinsAgo = timeNow - 18800
let lobbyMatches = []
let liveGbMatches = []
let pastGbMatches = []
// liveGbPlayers is an object because I want both the player and the match they're currently in. Player is key, match is value
let liveGbPlayers = {}
// Setting the community steam IDs. Move this to a .env file before going live 



function ladderTypeGrammar (mapType) {
    if (mapType === "Unranked") {
      return "大厅"
    } else if (mapType === undefined) {
      return "an Undefined Game"
    } else {
    return `a ${mapType}`}
  }  
  //getLeaderboard().catch( error => {console.log(error)})
  // This function will take 1 match and split the players into their teams and sort them by colour

  //! INSERT HTML
function matchOutcome(player) {
      if(player['won'] === null) {
        return ""
      } else if (player['won'] === true){
        return '<span class="victor"><i class="fa-solid fa-crown "></i></span>'
      } else {
        return ""
      }
  }





  


  


function getprofile_ids(playerdata) {
    let profile_ids = []
    playerdata.forEach(player=> {profile_ids.push(player.profile_id)})
    
    return profile_ids
  }
let total =[]



function pfs(profileid,ptotal)
  {
  
  for (var i=0;i<ptotal.length;i++){
    if (ptotal[i].id==profileid){
       return i
    }
  }
 }
 

function filterpMatches(Matches,playerdata,id) {
     
     playerdata.sort(function(a, b){return b.qrating - a.qrating})
     playerdata.forEach((player)=>{
     ptotal.push({"id":player.profile_id,"games":0,"wins":0,"twins":0,"owins":0,"loses":0,"tloses":0,"oloses":0,"un":0,"k":0,"tk":0,"lk":0,"ok":0,"ky":0})
     })
     var profile_ids=getprofile_ids(playerdata)
     Matches.forEach((match) => {
             let team1= 0
             let team2= 0
             if ( (new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000){

             }
             else{
              idmaps['games'].push(match.map_name)
              match.teams[0].forEach((player)=>{
              
            if (player.profile_id==id){
                     team1 = player.team
                     
                     idrating.push({"started":new Date(match['started']),"qrating":player.newqrating})
                     civs['games'].push(player.civ_name)
                     if (player['won'] === true){
                      idmaps['wins'].push(match.map_name)
                      civs['wins'].push(player.civ_name)
                     }
             }
             }); 
             match.teams[1].forEach((player)=>{
            
                if (player.profile_id==id){
                         team2 = player.team
                         
                         idrating.push({"started":new Date(match['started']),"qrating":player.newqrating})
                         civs['games'].push(player.civ_name)
                         if (player['won'] === true){
                          idmaps['wins'].push(match.map_name)
                          civs['wins'].push(player.civ_name)
                         }
                 }
                 }); 
              match.teams[0].forEach((player)=>{
                
                   
                  ptotal[pfs(player.profile_id,ptotal)].games += 1
                  
                        if(player['won'] === null) {
                          ptotal[pfs(player.profile_id,ptotal)].un += 1
                        } 
                        else if (player['won'] === true&&player.team==team1){
                          ptotal[pfs(player.profile_id,ptotal)].wins += 1
                          ptotal[pfs(player.profile_id,ptotal)].twins += 1
                        } 
                        else if (player['won'] === true&&player.team!=team1){
                          ptotal[pfs(player.profile_id,ptotal)].wins += 1
                         ptotal[pfs(player.profile_id,ptotal)].owins += 1
                        }
                        else  if (player['won'] === false&&player.team==team1){
                          ptotal[pfs(player.profile_id,ptotal)].loses += 1
                          ptotal[pfs(player.profile_id,ptotal)].tloses += 1
                        }
                        else  if (player['won'] === false&&player.team!=team1){
                          ptotal[pfs(player.profile_id,ptotal)].loses += 1
                          ptotal[pfs(player.profile_id,ptotal)].oloses += 1
                        }
                        if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                          ptotal[pfs(player.profile_id,ptotal)].k =  Math.round(ptotal[pfs(player.profile_id,ptotal)].wins*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                        }
                        else{
                             ptotal[pfs(player.profile_id,ptotal)].k="0"
                        }
                        if( (ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses)>0){
                          ptotal[pfs(player.profile_id,ptotal)].tk =  Math.round(ptotal[pfs(player.profile_id,ptotal)].twins*100/( ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses))
                        }
                        else{
                             ptotal[pfs(player.profile_id,ptotal)].tk="0"
                        }
                        if( (ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses)>0){
                          ptotal[pfs(player.profile_id,ptotal)].lk =  Math.round(ptotal[pfs(player.profile_id,ptotal)].owins*100/( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses))
                        }
                        else{
                             ptotal[pfs(player.profile_id,ptotal)].lk="0"
                        }
                        if( ( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses)>0){
                          ptotal[pfs(player.profile_id,ptotal)].ok =  Math.round((ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].oloses)*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                        }
                        else{
                             ptotal[pfs(player.profile_id,ptotal)].ok="0"
                        }
                        
                        if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                          ptotal[pfs(player.profile_id,ptotal)].ky =  Math.round((ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].tloses)*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                        }
                        else{
                             ptotal[pfs(player.profile_id,ptotal)].ky="0"
                        }
                  });
                  match.teams[1].forEach((player)=>{
                
                   
                    ptotal[pfs(player.profile_id,ptotal)].games += 1
                    
                    if(player['won'] === null) {
                            ptotal[pfs(player.profile_id,ptotal)].un += 1
                          } else if (player['won'] === true&&player.team==team2){
                            ptotal[pfs(player.profile_id,ptotal)].wins += 1
                            ptotal[pfs(player.profile_id,ptotal)].twins += 1
                          } else if (player['won'] === true&&player.team!=team2){
                            ptotal[pfs(player.profile_id,ptotal)].wins += 1
                           ptotal[pfs(player.profile_id,ptotal)].owins += 1
                          }
                          else  if (player['won'] === false&&player.team==team2){
                            ptotal[pfs(player.profile_id,ptotal)].loses += 1
                            ptotal[pfs(player.profile_id,ptotal)].tloses += 1
                          }
                          else  if (player['won'] === false&&player.team!=team2){
                            ptotal[pfs(player.profile_id,ptotal)].loses += 1
                            ptotal[pfs(player.profile_id,ptotal)].oloses += 1
                          }
                          if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                            ptotal[pfs(player.profile_id,ptotal)].k =  Math.round(ptotal[pfs(player.profile_id,ptotal)].wins*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                          }
                          else{
                               ptotal[pfs(player.profile_id,ptotal)].k="0"
                          }
                          if( (ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses)>0){
                            ptotal[pfs(player.profile_id,ptotal)].tk =  Math.round(ptotal[pfs(player.profile_id,ptotal)].twins*100/( ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses))
                          }
                          else{
                               ptotal[pfs(player.profile_id,ptotal)].tk="0"
                          }
                          if( (ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses)>0){
                            ptotal[pfs(player.profile_id,ptotal)].lk =  Math.round(ptotal[pfs(player.profile_id,ptotal)].owins*100/( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses))
                          }
                          else{
                               ptotal[pfs(player.profile_id,ptotal)].lk="0"
                          }
                          if( ( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses)>0){
                            ptotal[pfs(player.profile_id,ptotal)].ok =  Math.round((ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].oloses)*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                          }
                          else{
                               ptotal[pfs(player.profile_id,ptotal)].ok="0"
                          }
                          
                          if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                            ptotal[pfs(player.profile_id,ptotal)].ky =  Math.round((ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].tloses)*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                          }
                          else{
                               ptotal[pfs(player.profile_id,ptotal)].ky="0"
                          }
                    });    
             }

          }); 
         
    }
    function filterpMatches1v1(Matches,playerdata,id) {
     
      playerdata.sort(function(a, b){return b.qrating1v1 - a.qrating1v1})
      playerdata.forEach((player)=>{
      ptotal.push({"id":player.profile_id,"games":0,"wins":0,"twins":0,"owins":0,"loses":0,"tloses":0,"oloses":0,"un":0,"k":0,"tk":0,"ok":0,"ky":0})
      })
      var profile_ids=getprofile_ids(playerdata)
      Matches.forEach((match) => {
              let team1= 0
              let team2= 0
              if ( (new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000){
 
              }
              else{
               idmaps['games'].push(match.map_name)
               match.teams[0].forEach((player)=>{
               
             if (player.profile_id==id){
                      team1 = player.team
                      
                      idrating.push({"started":new Date(match['started']),"qrating":player.newqrating})
                      civs['games'].push(player.civ_name)
                      if (player['won'] === true){
                       idmaps['wins'].push(match.map_name)
                       civs['wins'].push(player.civ_name)
                      }
              }
              }); 
              
               match.teams[0].forEach((player)=>{
                 
                    
                   ptotal[pfs(player.profile_id,ptotal)].games += 1
                   
                         if(player['won'] === null) {
                           ptotal[pfs(player.profile_id,ptotal)].un += 1
                         } 
                         else if (player['won'] === true&&player.team==team1){
                           ptotal[pfs(player.profile_id,ptotal)].wins += 1
                           ptotal[pfs(player.profile_id,ptotal)].twins += 1
                         } 
                         else if (player['won'] === true&&player.team!=team1){
                           ptotal[pfs(player.profile_id,ptotal)].wins += 1
                          ptotal[pfs(player.profile_id,ptotal)].owins += 1
                         }
                         else  if (player['won'] === false&&player.team==team1){
                           ptotal[pfs(player.profile_id,ptotal)].loses += 1
                           ptotal[pfs(player.profile_id,ptotal)].tloses += 1
                         }
                         else  if (player['won'] === false&&player.team!=team1){
                           ptotal[pfs(player.profile_id,ptotal)].loses += 1
                           ptotal[pfs(player.profile_id,ptotal)].oloses += 1
                         }
                         if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                           ptotal[pfs(player.profile_id,ptotal)].k =  Math.round(ptotal[pfs(player.profile_id,ptotal)].wins*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                         }
                         else{
                              ptotal[pfs(player.profile_id,ptotal)].k="0"
                         }
                         if( (ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses)>0){
                           ptotal[pfs(player.profile_id,ptotal)].tk =  Math.round(ptotal[pfs(player.profile_id,ptotal)].twins*100/( ptotal[pfs(player.profile_id,ptotal)].twins+ ptotal[pfs(player.profile_id,ptotal)].tloses))
                         }
                         else{
                              ptotal[pfs(player.profile_id,ptotal)].tk="0"
                         }
                         if( ( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses)>0){
                           ptotal[pfs(player.profile_id,ptotal)].ok =  Math.round(ptotal[pfs(player.profile_id,ptotal)].owins*100/( ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].oloses))
                         }
                         else{
                              ptotal[pfs(player.profile_id,ptotal)].ok="0"
                         }
                         
                         if( ( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses)>0){
                           ptotal[pfs(player.profile_id,ptotal)].ky =  Math.round((ptotal[pfs(player.profile_id,ptotal)].owins+ ptotal[pfs(player.profile_id,ptotal)].tloses)*100/( ptotal[pfs(player.profile_id,ptotal)].wins+ ptotal[pfs(player.profile_id,ptotal)].loses))
                         }
                         else{
                              ptotal[pfs(player.profile_id,ptotal)].ky="0"
                         }
                   });
                    
              }
 
           }); 
          
     }
 
function insertLiveGames (pastGbMatches) {
    
      
      pastGbMatches.forEach((match) =>  {
            let team1EloAvg = 0
            let team2EloAvg = 0 
            let team1Elo = 0
            let team2Elo = 0
            const teams = match['teams']
            const team1 = [teams[0][0]]
            const team2 = [teams[0][1]]
            
            if ( (new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000  || team1[0].won==null ) {
              team1.forEach((player) =>  { 
              if(ofs(player.profile_id).status==2){
                    player.profile_id = ofs(player.profile_id).qrating1v1
                }
    
                player.qrating=Number(ofs(player.profile_id).newqrating1v1),
                player.qelo=0,
                player.newqrating=Number(ofs(player.profile_id).newqrating1v1)})
    
                team2.forEach((player) =>  { 
              if(ofs(player.profile_id).status==2){
                    player.profile_id = ofs(player.profile_id).qrating1v1
                }
                player.qrating=Number(ofs(player.profile_id).newqrating1v1),
                player.qelo=0,
                player.newqrating=Number(ofs(player.profile_id).newqrating1v1)})
    
    
        } else {
           
            
            team1.forEach((player) =>  { 
              if(ofs(player.profile_id).status==2){  
                player.profile_id = ofs(player.profile_id).qrating1v1
                team1EloAvg += Number(ofs(player.profile_id).newqrating1v1)
                team1EloAvg = Math.floor(team1EloAvg)
                
                }else{
                team1EloAvg += Number(ofs(player.profile_id).newqrating1v1)
                team1EloAvg = Math.floor(team1EloAvg)
                
              }
              })
            team2.forEach((player) =>  {
              if(ofs(player.profile_id).status==2){
                    player.profile_id = ofs(player.profile_id).qrating1v1
                    team2EloAvg += Number(ofs(player.profile_id).newqrating1v1)
                    team2EloAvg = Math.floor(team2EloAvg)
                }else{
                team2EloAvg += Number(ofs(player.profile_id).newqrating1v1)
                team2EloAvg = Math.floor(team2EloAvg)}
                
             })
         
         
            
            
            
            let elo = matchelo(team1[0],team1EloAvg,team2EloAvg,128)
            team1Elo = Number(elo[0])
            team2Elo = Number(elo[1])
            team1.forEach((player) =>  { 
             
             
              player.qelo=Number(team1Elo)
              player.qrating=Number(ofs(player.profile_id).newqrating1v1),
              player.newqrating=Number(ofs(player.profile_id).newqrating1v1+player.qelo)
             
             ofs(player.profile_id).newqrating1v1=player.newqrating
           })
           team2.forEach((player) =>  {
              
           
              player.qelo=Number(team2Elo)
              player.qrating=Number(ofs(player.profile_id).newqrating1v1),
              player.newqrating=Number(ofs(player.profile_id).newqrating1v1+player.qelo)
             
           ofs(player.profile_id).newqrating1v1=player.newqrating
           })
    
          
            let team1won = 0
            let team2won = 0
            let team1streak =0
            let team2streak =0
    
            if (team1[0].won==true){
              team1won = 1
              team2won = 0
              team1streak =1
              team2streak =-1
            }
            else if(team1[0].won==false)
            {
              team1won = 0
              team2won = 1
              team1streak =-1
              team2streak =1
            }
            else{
              team1won = 0
              team2won = 0
              team1streak =0
              team2streak =0
            }
            team1.forEach((player) => {
              if ((ofs(player.profile_id).steak1v1 >=0 && team1streak==1) || (ofs(player.profile_id).steak1v1 <=0 && team1streak==-1) ){
                ofs(player.profile_id).steak1v1 += team1streak
                
              }
              else if ((ofs(player.profile_id).steak1v1 >=0 && team1streak==-1) || (ofs(player.profile_id).steak1v1 <=0 && team1streak==1) ){
                ofs(player.profile_id).steak1v1 = team1streak
              }
              if (Math.abs(ofs(player.profile_id).steak1v1 ) >= Math.abs(ofs(player.profile_id).streakest1v1 )){
                ofs(player.profile_id).streakest1v1 = ofs(player.profile_id).steak1v1 
              }
            
    
             
              ofs(player.profile_id).wins1v1+=team1won,
              ofs(player.profile_id).loses1v1+=team2won,
              ofs(player.profile_id).games1v1=ofs(player.profile_id).wins1v1+ofs(player.profile_id).loses1v1
             
            })
            team2.forEach((player) =>  {
              if ((ofs(player.profile_id).steak1v1 >=0 && team2streak==1 )|| (ofs(player.profile_id).steak1v1 <=0 && team2streak==-1 )){
                ofs(player.profile_id).steak1v1 += team2streak
              }
              else if ((ofs(player.profile_id).steak1v1 >=0 && team2streak==-1) || (ofs(player.profile_id).steak1v1 <=0 && team2streak==1) ){
                ofs(player.profile_id).steak1v1 = team2streak
              }
              if (Math.abs(ofs(player.profile_id).steak1v1 ) >= Math.abs(ofs(player.profile_id).streakest1v1 )){
                ofs(player.profile_id).streakest1v1 = ofs(player.profile_id).steak1v1 
              }
             
             
              ofs(player.profile_id).wins1v1+=team2won,
             
              ofs(player.profile_id).loses1v1+=team1won,
            
              ofs(player.profile_id).games1v1=ofs(player.profile_id).wins1v1+ofs(player.profile_id).loses1v1
            
            })
          }      
        })
        
      
}





