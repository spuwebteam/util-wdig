$(document).ready(function(){
    var recurseNodes = function(node, html, ariaLabeledBy) {
        var subs = node.m_subNodes,
            len = subs.length;
        html+= '<ul';
        if (ariaLabeledBy) {
            html+= ' aria-labelledby="' + ariaLabeledBy + '"';  
        }
        html+= '>';
        for (var i = 0; i < len; i++) {
            var hasChildren = subs[i].m_subNodes.length,
                idLabel = 'node-' + subs[i].m_id;
            html += '<li id="' + idLabel + '"';  
            if (hasChildren) {
                html += ' class="hasChildren"';
            }
            html += '><a';
            if (hasChildren) {
                html += ' aria-haspopup="true" aria-expanded="false"';
            }
            html += ' href="' + subs[i].m_href + '">' + subs[i].m_label;
            if (hasChildren) {
                html += '<i class="fa fa-chevron-circle-down"></i>';
            }
            html += '</a>';
            if (hasChildren) {
                html += recurseNodes(subs[i], '', idLabel);
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    };
    
    var $lut = $('#wdigNav'),
        $lutLi = $('#wdigNav li'),
        $lutHTML = '<ul id="start"><li class="top hasChildren"><a href id="label">';
        $lutHTML += 'Select your category<i class="fa fa-chevron-circle-down"></i></a>';
        $lutHTML += recurseNodes(g_navNode_0_8, '');
        $lutHTML += '</li></ul>';
        
    $lut.append($lutHTML);

    $('#wdigNav ul li a').on('click', function(e) {
        $('#label').html('Start over');
        e.preventDefault(); // prevents default to anchor tag
        if ($(this).parent().hasClass('top') || $(this).parent().hasClass('hasChildren')) {
        } else {
            var href = $(this).attr('href');
                $.get(href, function(data) {
                    $('#wdigContent').html(data);
                });
                $('#wdigNav a').one('click', function(e) {
                    $('#wdigContent').html('');
                });
        }

        var sib = $(this).siblings('ul');
        var sibChild = sib.children('li');
        var close = $(this).closest('li');
        var attrTrue = $(this).attr('aria-expanded', 'true');

        if (sib.hasClass('active')) { 
        // clicking on previous parent to get its children
            attrTrue;
            // adds true to newly expanded a for SR accesibility 
            sib.find('a').attr('aria-expanded', 'false'); 
            // adds false to previously expanded a for sr
            sibChild.find('ul').removeClass('active'); 
            // find all ul below and remove class active
            sib.find('li').removeClass('selected'); 
            // removes selected color from all parent li
            sibChild.find('li').hide();
            sibChild.slideDown();
        } else { 
        // clicking on li to bring its children
            attrTrue;     
            // adds true to newly expanded <a> for SR accesibility
            $(this).parents('li').parents('ul').parents('li').children('a').attr('aria-expanded', 'false'); 
            // adds false to previously expanded <a> for sr
            sibChild.hide(); 
            // hide li's that are about to slide down
            sib.addClass('active');
            close.addClass('selected'); 
            // adds selected color to clicked li
            close.siblings('li').hide(); 
            // hide siblings of clicked li
            sibChild.slideDown(); 
            // slide down children of clicked li
        }
        $('#label').attr('aria-expanded', 'false'); 
        // always false on start over button
    });
});