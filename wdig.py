infile = open('wdig.txt', 'r')
outfile = open('out.txt', 'w')
outfile.write('var aliases = [')
words = ''
for line in infile: 
    try:
        num = int(line)
        num_change = True
    except:
        pass
    if not num_change:
        words = words + '{label:"' + line.rstrip('\r\n\t') + '",value:\'<!--$wcmUrl("nodelink",' + str(num) + ')-->\',hasChild:false},\n'
    num_change = False
outfile.write(words + '];')