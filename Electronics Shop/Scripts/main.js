const maxValue = 10000000;
const maxNumber = 1000;

//test function to absorbe input from the provided html page
function takeRawInput(s)
{
   var d = s.split("\n");
   if(d.length != 3)
      alert("There must be three lines in the input");
   else
   {
      var e = getMoneySpent(d[0], d[1], d[2]);
      if((typeof e) == "string")
      {
         console.log(e);
         alert("Check console for errors.");
      }
      else
      {
         console.log(e);
         alert("Success!\n" + e);
      }
   }
}

//take input of budget, array of keyboards and array of drives
function getMoneySpent(b, k, d)
{
   //run validation
   var err = validateData(b,k,d);
   //if any errors, return them
   if(err != "")
   {
      return err;
   }
   else//otherwise, do the calculations
   {
      var data = b.trim().split(" ");
      var keyboards = k.trim().split(" ");
      var drives = d.trim().split(" ");

      var maxPrice = parseInt(data[0]);
      var highest = -1;

      for(var i = 0; i < parseInt(data[1]); ++i)
      {
         //parse the value of this keyboard
         var p = parseInt(keyboards[i]);

         //foreach keyboard, check if the sum is greater than the current highest
         for(var x = 0; x < parseInt(data[2]); ++x)
         {
            var q = parseInt(drives[x]);

            if(p + q > highest && p + q <= maxPrice)
               highest = p + q;
         }
         console.log(highest);
      }

      return highest;
   }
}

//validation function to ensure data is properly formated and typed
function validateData(b,k,d)
{
   //error output variable if inputs are bad
   var err = "";

   //kept writing same error, just dropped a flag for it
   var bErr = false;
   var bErrMsg = "First line must be in \"# # #\" format\n";

   //test datatypes
   if((typeof b) != "string")
   {
      bErr = true;
      err += bErrMsg;
   }
   if((typeof k) != "string")
      err += "Second line must be space seperated numbers\n";
   if((typeof d) != "string")
      err += "Third line must be space seperated numbers\n";

   //get indevidual elements of space seperated items
   var data = b.trim().split(" ");
   var keyboards = k.trim().split(" ");
   var drives = d.trim().split(" ");

   console.log(data);
   console.log(keyboards);
   console.log(drives);

   if(data.length != 3 && !bErr)
   {
      bErr = true;
      err += bErrMsg;
   }

   //ensure all data elements are numerical
   for(var i = 0; i < 3; ++i)
   {
      if(isNaN(parseInt(data[i])))
      {
         //start displaying from 1 because its easier for non programmers to understand
         bErr = true;
         err += "Element " + (i+1) + " of line one must be a number\n";
      }
   }
   for(var i = 0; i < keyboards.length; ++i)
   {
      if(isNaN(parseInt(keyboards[i])))
      {
         err += "Element " + (i+1) + " of line two must be a number\n";
      }
      else if(parseInt(keyboards[i]) > maxValue)
      {
         err += "Element " + (i+1) + " of line two must be less than or euqal to 10^6\n";
      }
   }
   for(var i = 0; i < drives.length; ++i)
   {
      if(isNaN(parseInt(drives[i])))
      {
         err += "Element " + (i+1) + " of line three must be a number\n";
      }
      else if(parseInt(drives[i]) > maxValue)
      {
         err += "Element " + (i+1) + " of line three must be less than or euqal to 10^6\n";
      }
   }

   //if the b data is good, ensure the lengths match and numbers are valid
   if(!bErr)
   {
      //parse values once, since you need to check them multiple times
      var b1 = parseInt(data[0]);
      var b2 = parseInt(data[1]);
      var b3 = parseInt(data[2]);

      if(b1 > maxValue || b1 < 1)
      {
         err += "Element one of line one must be less than or euqal to 10^6 and greater than 0\n";
      }
      if(b2 > maxNumber || b2 < 1)
      {
         err += "Element two of line one must be less than or euqal to 1000 and greater than 0\n";
      }
      if(b3 > maxNumber || b3 < 1)
      {
         err += "Element three of line one must be less than or euqal to 1000 and greater than 0\n";
      }

      if(keyboards.length > maxNumber || keyboards.length < 1)
      {
         err += "Line two must have between 1 and 1000 items\n";
      }
      if(drives.length > maxNumber || drives.length < 1)
      {
         err += "Line three must have between 1 and 1000 items\n";
      }

      if(b2 != keyboards.length)
      {
         err += "The second number on line one should match the number of items in line two.\n";
      }
      if(b3 != drives.length)
      {
         err += "The third number on line one should match the number of items in line three.\n";
      }
   } 

   return err;
}