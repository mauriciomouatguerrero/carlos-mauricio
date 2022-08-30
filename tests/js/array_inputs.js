    var i     = 0;
    var total = 0;

    $(document).ready(function() {
        
        addNewRow();
        $("#txtTotal").val(0);
        
        $("#btnClearAll").click(function() {
           $("#contenedor").empty();
           
           i = 0;
           addNewRow();
        });
    });


    
    
    function addNewRow() {
        var contenedor = $("#contenedor");

        
         contenedor.append(
             "<span name='t_codigo_"+ i +"'>Código: </span>" +
             "    <input" +
             "       type='text'" +
             "       name='txtCodigo["+ i +"]' " +
             "       maxlength='13' " +
             "       onkeypress='return whenCodigoEnter(event, this);' " +
             "    />"
         );
        
         contenedor.append(
             "<span name='t_cantidad_"+ i +"'>Cant.: </span>" +
             "    <input" +
             "       type='text'" +
             "       name='txtCantidad["+ i +"]' " +
             "       maxlength='3' " +
             "       onkeypress='return whenCantidadEnter(event, this);' " +
             "    />"
         );

         contenedor.append(
             "<span name='t_precio_"+ i +"'>Precio: </span>" +
             "    <input" +
             "       type='text'" +
             "       name='txtPrecio["+ i +"]' " +
             "    />"
         );

         contenedor.append(
             "<span name='t_subtotal_"+ i +"'>Sub-Total: </span>" +
             "    <input" +
             "       type='text'" +
             "       name='txtSubtotal["+ i +"]' " +
             "    />"
         );

         contenedor.append(
             "<span name='t_excluir_"+ i +"'>Excluir: </span>" +
             "    <input" +
             "       type='checkbox'" +
             "       name='chkExcludes["+ i +"]' " +
             "       onclick='excludeItem(this);' " +
             "    />" +
             "<p id='separator_"+ i +"'></p>" 
         );
        
         aplicarReglas(i);
         $("input[name='txtCodigo["+ i +"]']").focus(); 
        
         i++;

        
    }


    function excludeItem(obj) {
        var parts = obj.name.split("[");
            parts = parts[1].split("]");
        var curIndex = parts[0];

        if(confirm('¿ Desea descartar el artículo seleccionado ?')) {
           recalcForm(curIndex);
        
           $("span[name='t_codigo_"+ curIndex +"']").remove();
           $("span[name='t_cantidad_"+ curIndex +"']").remove();
           $("span[name='t_precio_"+ curIndex +"']").remove();
           $("span[name='t_subtotal_"+ curIndex +"']").remove();
           $("span[name='t_excluir_"+ curIndex +"']").remove();

           $("input[name='txtCodigo["+ curIndex +"]']").remove();
           $("input[name='txtCantidad["+ curIndex +"]']").remove();
           $("input[name='txtPrecio["+ curIndex +"]']").remove();
           $("input[name='txtSubtotal["+ curIndex +"]']").remove();
           $("input[name='chkExcludes["+ curIndex +"]']").remove();

           $("#separator_"+ curIndex).remove(); 
        }
        else {
           $("input[name='chkExcludes["+ curIndex +"]']").prop('checked', false); 
        }      

    }

    function whenCantidadEnter(event, obj) {
       if(event.which == 13) {
          calcForm(obj);
          addNewRow();
          //console.log('Index: ' + $("input[name='txtSubtotal").index());
       }
    }

    function whenCodigoEnter(event, obj) {
       if(event.which == 13) {
          console.log(obj.name + ' - indice: ' + i);
          // resultado de la consulta
          $("input[name='txtCantidad["+ (i - 1) +"]']").focus();
       }
    }

    function calcForm(obj) {
          var cantidad = obj.value;
          var precio   = 750;
          var subtotal = precio * cantidad;

          // setting up
          $("input[name='txtPrecio["+ (i - 1) +"]']").val(precio);
          $("input[name='txtSubtotal["+ (i - 1) +"]']").val(subtotal);
          
          total += subtotal;

          $("#txtTotal").val(total);
          $("input[name='txtCodigo["+ i +"]']").focus();

          
          console.log("Total: " + total);
          
    }

    function recalcForm(curIndex) {
          var subtotal  = $("input[name='txtSubtotal["+ curIndex +"]']").val();
          var lastIndex = i - 1;
          
          total -= subtotal;

          $("#txtTotal").val(total);

          $("input[name='txtCodigo[" + lastIndex +"]").focus();         

          
          console.log("Total: " + total);
          
    }

   function aplicarReglas(index) {
      // evitar alfanuméricos
      $("input[name='txtCodigo["+ i +"]']").on('input', function () {
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
      });
      $("input[name='txtCantidad["+ i +"]']").on('input', function () {
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
      });
      $("input[name='txtPrecio["+ i +"]']").on('input', function () {
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
      });
      $("input[name='txtSubtotal["+ i +"]']").on('input', function () {
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
      });
     
      // restringir largo
      // $("input[name='txtCodigo["+ i +"]']").prop('max', 13);

   }