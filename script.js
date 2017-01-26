$(document).ready(function(){
    var recurseNodes = function(node, html) {
        var subs = node.m_subNodes,
            len = subs.length;
        html+= '<ul>';
        for (var i = 0; i < len; i++) {
        	var hasChildren = subs[i].m_subNodes.length;
            html += '<li';
            if (hasChildren) {
            	html += ' class="hasChildren"';
            }
            html += '><a target="_blank" href="' + subs[i].m_href + '">' + subs[i].m_label;
            if (hasChildren) {
            	html += '<i class="fa fa-chevron-circle-down"></i>';
            }
            html += '</a>';
            if (hasChildren) {
            	html += recurseNodes(subs[i], '');
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    };
    
    var $lut = $('#nav'),
        $lutLi = $('#nav li'),
        $lutHTML = '<ul id="start"><li class="top hasChildren"><a href id="label">Select your category<i class="fa fa-chevron-circle-down"></i></a>';
        $lutHTML += recurseNodes(g_navNode_0_8, '');
        $lutHTML += '</li></ul>';
        
    $lut.append($lutHTML);


	$('#nav ul li a').on('click', function(e){
		$('#label').html('Start over');
	    
	    if ($(this).parent().hasClass('top') || $(this).parent().hasClass('hasChildren')) {
	    	e.preventDefault(); // prevents default to anchor tag
	    } else {
	    	//follows href
	    }

        if ($(this).siblings('ul').hasClass('active')) {
			$(this).siblings('ul').children('li').find('ul').removeClass('active');
			$(this).siblings('ul').children('li').show();
		} else {
			$(this).siblings('ul').addClass('active');
			$(this).siblings('ul').children('li').show();
			$(this).closest('li').siblings('li').hide();
		}
    });
});