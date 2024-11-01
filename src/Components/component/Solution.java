import java.util.*;

public class Solution {
    public static int longestSuccessiveElement(int [] b) {
        Set <Integer> set = new TreeSet<Integer>();
        for(int i:b) {
            set.add(i);
        }
        int count =1 ;
        int max = 1;
        for( Integer i:set) {
            if(set.contains(i +1))
                count ++;
            else
                count =1;
            max = Math.max(max ,count);
        }
        return max;
        }
public static void main (String[] arg) {
    int[] b=new int[]{100,4,200,1,3,2};
    longestSuccessiveElement(b);
}
}






