backend:
+ slugify- when you wnat to use wide space you can use slugify
            conver sapce into "-" , "_", etc


+ npm install express-formidable - use for upload any file
                                 in backend.

                formidable() use as middalware and add in with other middleware in productRouter file.
                import fs from "fs"  is use in controller file


==>   URL.createObjectURL(photo) => don't pass the image directly into image src at the time of show image.    it affect on application performance.

ex:-
    <img
      src={URL.createObjectURL(photo)}
      alt="product-photo"
      height={"200px"}
      className="img img-responsive"
    />


==>  If you want to use formData than wrap all input and select tag tags with in form tag and add handle create function on form onSubmit event.