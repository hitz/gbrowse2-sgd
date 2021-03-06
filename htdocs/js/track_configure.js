// javascript behaviors for the track configuration dialog

var TrackConfigure = Class.create({

   glyph_select: function(config_container,glyph_element) {

    if (glyph_element == null) return;

    var all = config_container.select('tr').findAll(function(a){return !a.hasClassName('general')});
    all.each(function(a){a.hide()});
    var specific = false;

    if (glyph_element.value.match(/xyplot/)) {
       config_container.select('tr.xyplot').each(function(a){a.show()});
       specific = true;
    }
    if (glyph_element.value.match(/whiskers/)){
       config_container.select('tr.whiskers').each(function(a){a.show()});
       specific = true;
    }
    if (glyph_element.value.match(/vista/)) {
       config_container.select('tr.vista_plot').each(function(a){a.show()});
       config_container.select('tr.xyplot').each(function(a){a.show()});
       config_container.select('tr.wiggle').each(function(a){a.show()});
       var x = $('conf_xyplot_subtype');
       if (x != null) x.hide();
       specific = true;
    }
    if (glyph_element.value.match(/density/)){
       config_container.select('tr.density').each(function(a){a.show()});
       specific = true;
    }
    if (glyph_element.value.match(/wiggle/)){
       config_container.select('tr.wiggle').each(function(a){a.show()});
       var x = $('conf_xyplot_subtype');
       if (x != null) x.hide();
       specific = true;
    }

    if (!specific) {
       config_container.select('tr.features').each(function(a){a.show()});
    }

    config_container.select('tr.'+glyph_element.value).each(function(a){a.show()});

    if (glyph_element.value.match(/xyplot|vista|density|wiggle/)) {
       this.pivot_select($('conf_bicolor_pivot'));
       if (glyph_element.value.match(/wiggle|vista/))
	   this.autoscale_select($('conf_wiggle_autoscale'),glyph_element);
       else      
	   this.autoscale_select($('conf_xyplot_autoscale'),glyph_element);
   }
 },

 set_autoscale: function(el) {
    if (el.value != 'none')
	$$('input.score_bounds').each(function(a){a.value=''});
 },

 set_minmax: function(el) { 
	$F('autoscale_popup').selectedIndex=0;   
 },

 autoscale_select: function(scale_element,glyph_element) {
   var v=scale_element.value;
   var g=glyph_element.value;

   var autoscales = $('config_table').select('tr').findAll(function(a){return a.hasClassName('autoscale')});
   autoscales.each(function(a){a.hide()});
   if (g.match(/wiggle/) || g.match(/vista/)) {
       $('wiggle_autoscale').show();
   }
   else if (g.match(/xyplot/) || g.match(/density/)) {
       $('xyplot_autoscale').show();
   }

   var e=$('fixed_minmax');
   if (v=='none') {e.show()} else {e.hide()};
 },

 pivot_select: function(pivot_element) {

   var e=$('switch_point_other');
   var f=$$('tr.switch_point_color');
   if (pivot_element.value=='value'){
      e.show()
   } else{
      e.hide();
   }
   if (pivot_element.value=='none') {
      f.each(function(a){a.hide()});
      $('bgcolor_picker').show();
   } else {
     f.each(function(a){a.show()});
     $('bgcolor_picker').hide();
   }
 }

});


var track_configure = new TrackConfigure;
