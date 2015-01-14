/*
| @Author Kukuh Prabowo
| 2015
| version 0.1
| @return String
*/

(function( $ ) {

  $.fn.terbilang = function( options ) {
    
    var txtsrc;

    var setting = $.extend({
      lang: 'id',
      output: $('#terbilang-output')
    }, options);

    var IDreadThousand = function (n,dg,snum,thousandDesc) {
      var s='';
      var d1=Math.floor(n/100);
      var d2=Math.floor((n-(d1*100))/10);
      var d3=n-(d1*100)-(d2*10);
       
      if (d1>0) {
        if (d1==1) {
         s=s+'seratus ';
        } else {
         s=s+snum[d1]+' ratus ';
        }
      }
       
      if (d2>0) {
        if (d2==1) {
          switch(d3) {
            case 0: s=s+'sepuluh ';
                    break;
            case 1: s=s+'sebelas ';
                    break;
            default: s=s+snum[d3]+' belas ';
          }
        } else {
         s=s+snum[d2]+' puluh ';
        }
      }
       
      if (d3>0) {
        if ((d2>1)||(d2==0)) {
          if ((dg==1)&(d3==1)) {
            s=s+'se';
          } else {
            s=s+snum[d3]+' ';
          }
        }
      } 
       
      return s; 
    }

    var ENreadThousand = function (n,snum,thousandDesc,steens,stens) {
      var s='';
      var d1=Math.floor(n/100);
      var d2=Math.floor((n-(d1*100))/10);
      var d3=n-(d1*100)-(d2*10);
       
      if (d1>0) {
       s=s+snum[d1]+' hundred ';
      }
       
      if (d2>0) {
        if (d2==1) {
         s=s+steens[d3]+' ';
        } else {
         s=s+stens[d2]+' ';
        }
      }
       
      if (d3>0) {
        if ((d2>1)||(d2==0)) {
            s=s+snum[d3]+' ';
        }
      } 
       
      return s; 
    }

    var readAll = function (x,lang) {
      var s='';
      var i=0;
      var isfailed=false;
       
      switch(lang) {
        case 'id' : var snum=new Array('nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan');
                    var thousandDesc=new Array('','ribu','juta','miliar','triliun');
                    break;
        case 'en' : var snum=new Array('zero','one','two','three','four','five','six','seven','eight','nine');
                    var thousandDesc=new Array('','thousand','million','billion','trillion');
                    var steens=new Array('ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen');
                    var stens=new Array('','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety');
                    break;
        default: alert('Unknown language');
                 isfailed=true;
       }
       
      if (isNaN(x)) {
        isfailed=true;
        alert('Not a number!');
      } else {
       x=parseFloat(x);
      }
       
      if (isfailed==false) {
       do {
        var groupNumbers = Math.round(((Math.floor(x)/1000)-Math.floor((Math.floor(x)/1000)))*1000);
        if (lang=='id') {
          s=IDreadThousand(groupNumbers,i,snum,thousandDesc)+thousandDesc[i]+' '+s;
          if (x==0) {s='nol'};
        }
        if (lang=='en') {
          s=ENreadThousand(groupNumbers,snum,thousandDesc,steens,stens)+thousandDesc[i]+' '+s;
          if (x==0) {s='zero'};
        }
        x=Math.floor(Math.floor(x)/1000);
        i++;
       } while (x>0);
       return s.replace(/^\s*|\s(?=\s)|\s*$/g, '');
      } else {
       return 'NaN';
      }
    }

    var readNumbers = function () {
      var txtout = setting.output;
      switch(setting.lang) {
        case 'id' : var lang = setting.lang;
                    var cur='rupiah';
                    var cen='sen';
                    break;
        case 'en' : var lang = setting.lang;
                    var cur='dollar';
                    var cen='cent';
                    break;
      }
      
       var ssrc = txtsrc.val();
       // window.alert(ssrc);
       var ssrc = txtsrc.val().split(/[.]|[,]/);
       var sout=readAll(ssrc,lang)+' '+cur;
       var sout1='';
       if (ssrc[1]!=undefined) {
        sout1=readAll(ssrc[1].substr(0,2),lang)+' '+cen;
       }
       if ((sout.search('NaN')!=-1)||(sout1.search('NaN')!=-1)) {
        txtsrc.val('');
        txtout.val('');
       } else {
         txtout.val(sout+' '+sout1);
       }     
    }  

    return this.each(function() {
      var idsrc = $(this);
      $(document).on('keyup change', idsrc, function(e) {
        txtsrc = idsrc;
        if (txtsrc.val() != '') {
          readNumbers();
        } else {
          txtsrc.val('');
        }
      });
    }); 
  };

} (jQuery));
