
def g
  s = 'go';
  f = Proc.new { |x|
    return 'o'
    # if (x == 'al') then
    #   return s + x
    # else
    #   s += 'o'
    #   return f
    # end
  }
  return f.call
end


puts 'g', g()()

# puts "1 #{g()('al')}"
# puts "2 #{g{}{'al'}}"
# puts "3 #{g()()()('al')}"

# puts "7 #{g()()()()()()()('al')}"
