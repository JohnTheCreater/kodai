const express=require('express');
const nodemailer=require('nodemailer');
const cors=require('cors');
const path=require('path')
const moment=require('moment')
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/dist/index.html'))
})






app.post('/api/sendMail',async(req,res)=>{
    const{item,form,date}=req.body;

    const sender=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'neenikafoodpower@gmail.com',
            pass:'trlm dvyk yggg zsio',

        }
    })
    if(item)
    {
    delete item.img_path;
    item.type=item.type==1?'Land':'hotel';
    }
    const composeMail={
        from:'neenikafoodpower@gmail.com',
        to:'jo214841@gmail.com',
        subject:'REQUEST!',
        html:`
<div style="font-family: Arial, sans-serif; color: #333;">
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Form Key</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Form Value</th>
            </tr>
        </thead>
        <tbody>
            ${form && Object.keys(form).map(key => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${form[key]}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    ${item?
        `
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Key</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Value</th>
            </tr>
        </thead>
        <tbody>
            ${item? Object.keys(item).map(key => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item[key]}</td>
                </tr>
            `).join(''):''}
        </tbody>
    </table>`
    :''}
    ${date ?`
    <div><h1>Date:</h1><span>${moment(date).format('DD-MM-YYYY h:mm A')}</span></div>`:''
    }
</div>
`
    }

    sender.sendMail(composeMail,(err,result)=>{
        if(err) return res.status(500).send();
        console.log('mail sended');
        res.status(200).send();
    })

})

app.listen(2020,()=>
console.log('app at ',2020));