import React from 'react';

const History = () => (
  <section id="history" className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800">Our Journey</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          From a humble beginning to becoming Siliguri's leading computer training center.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
            <img 
                src="https://content.jdmagicbox.com/comp/siliguri/dc/9999px353.x353.100219164850.f4s3dc/catalogue/siliguri-future-scope-education-centre-haider-para-siliguri-computer-training-institutes-rhpwi.jpg" // <-- Replace with an image of your institute
                alt="Future Scope Institute Building" 
                className="rounded-lg shadow-2xl w-full"
            />
        </div>
        <div className="md:w-1/2">
            <div className="space-y-6 text-gray-700">
                <p>
                    Established in <span className="font-bold text-blue-600">2003</span>, Future Scope Computer Centre started with a singular mission: to bridge the gap between academic education and the demands of the IT industry.
                </p>
                <p>
                    Over the years, we've grown exponentially, continuously updating our curriculum to include the latest technologies. Our commitment to hands-on training has made us a trusted name for aspiring tech professionals.
                </p>
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default History;