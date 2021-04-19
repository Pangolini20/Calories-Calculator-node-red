var aliments=[];

for (var i=0 ; i< msg.topic.length;i++)
{
    aliments.push(msg.topic[i]);
}

var agenda=[];

for (i=0 ; i< msg.payload.length;i++)
{
    agenda.push(msg.payload[i]);
}

var results = [];

var dates=agenda.map(a => a.date);
dates =Array.from(new Set(dates));
for(i = 0 ; i< dates.length;i++)
{
    var data = {
        total : 0,
        date : 0,
        grade: "default"
        };
    
    data.date=dates[i];
    var products = agenda.filter( x => x.date === dates[i]);
    for(var j=0 ;j<products.length;j++)
    {
        var x = aliments.find(x => x.name === products[j].name);
        data.total+= x.calories * products[j].quantity;
     
    }
    
    if(data.total < 500 && data.total >250 )
        data.grade="Ok";
    else if(data.total < 250 )
        data.grade="You should eat more";
    else
        data.grade="You ate too much";    
    
    results.push(data);
}

msg.payload=results;
return msg;