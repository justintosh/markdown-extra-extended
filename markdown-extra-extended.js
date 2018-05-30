function mdExtraExtended() {

     var elems;
     var start;
     var end;
     var classesToAdd;

     $("dt, dd, li, th, td, img, blockquote, p").each(function() {
          elems = $(this).first().html();
          // start = elems.indexOf("{literal}{{/literal}"); // Applicable if working with Smarty template engine.
          // end = elems.indexOf("{literal}}{/literal}"); // Applicable if working with Smarty template engine.
          start = elems.indexOf("{"); // Applicable if working with Smarty template engine.
          end = elems.indexOf("}"); // Applicable if working with Smarty template engine.
          if (start != -1 && end != -1) {
               classesToAdd = elems.substr(start+1, end-start-1).replace(/\./g, "");
               switch ($(this).prop("tagName")) {
                    case "P":
                    case "LI":
                    case "DT":
                    case "DD":
                    case "BLOCKQUOTE":
                         $(this).addClass(classesToAdd);
                         break;
                    case "TD":
                         $(this).parent().addClass(classesToAdd); // If the class texts are added to the table body, apply the classes to the current table row.
                         break;
                    case "IMG":
                         $(this).closest("figure").addClass(classesToAdd); // If the class texts are added to the table body, apply the classes to the current table row.
                         break;
                    case "TH":
                         $(this).closest("table").addClass(classesToAdd); // If the class texts are added to table header, apply the classes to the entire table.
                         break;
                    default:
                         break;
               }
               $(this).first().html(elems.replace(elems.substr(start, end-start+1), "").trim()); // Removes the class texts and trims the string to remove the extra spaces before and after the string if available.
          }
     });