function mdExtraExtended() {

     var elems;
     var start;
     var end;
     var splitedStr;
     var classesToAdd;
     var idToAdd;

     $("dt, dd, li, th, td, img, blockquote, p").each(function() {
          elems = $(this).first().html();
          // start = elems.indexOf("{literal}{{/literal}"); // Applicable if working with Smarty template engine.
          // end = elems.indexOf("{literal}}{/literal}"); // Applicable if working with Smarty template engine.
          start = elems.indexOf("{"); // Applicable if working with Smarty template engine.
          end = elems.indexOf("}"); // Applicable if working with Smarty template engine.
          if (start != -1 && end != -1) {
               splitedStr = elems.substr(start+1, end-start-1).split (" ");
               for (var i=0;i<splitedStr.length;i++) {
                    if (splitedStr[i][0]==".") {
                         classesToAdd +=  splitedStr[i].replace(/\./g, "") + " ";
                    } else if (splitedStr[i][0]=="#") {
                         idToAdd += splitedStr[i].replace(/\#/g, "") + " ";
                    }
               }
          }
          // Trims the left and right of the string to remove unwanted spaces.
          classesToAdd = classesToAdd.trim();
          idToAdd = idToAdd.trim();

          switch ($(this).prop("tagName")) {
               case "P":
               case "LI":
               case "DT":
               case "DD":
               case "BLOCKQUOTE":
                    if (classesToAdd!="") {
                         $(this).addClass(classesToAdd);
                    }
                    if (idToAdd!="") {
                         $(this).attr('id', idToAdd);
                    }
                    break;
               case "TD":
                    // If the id and class texts are added to the table body, apply the classes to the current table row.
                    if (classesToAdd!="") {
                         $(this).parent().addClass(classesToAdd);
                    }
                    if (idToAdd!="") {
                         $(this).parent().attr('id', idToAdd);
                    }
                    break;
               case "IMG":
                    // If the id and class texts are added to the table body, apply the classes to the current table row.
                    if (classesToAdd!="") {
                         $(this).closest("figure").addClass(classesToAdd);
                    }
                    if (idToAdd!="") {
                         $(this).closest("figure").attr('id', idToAdd);
                    }
                    break;
               case "TH":
                    // If the id and class texts are added to table header, apply the classes to the entire table.
                    if (classesToAdd!="") {
                         $(this).closest("table").addClass(classesToAdd);
                    }
                    if (idToAdd!="") {
                         $(this).closest("table").attr('id', idToAdd);
                    }
                    break;
               default:
                    break;
          }
          $(this).first().html(elems.replace(/\{literal}{{/literal}.+{literal}}{/literal}/i,""));  // Removes the id and class texts.
     });
}