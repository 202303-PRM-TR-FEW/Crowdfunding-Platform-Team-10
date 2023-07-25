const AboutSection = () => {
  return (
    <div className="container flex  items-center justify-center lg:py-24 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  items-center justify-center">
        <div>
          <img
            src="https://images-ext-2.discordapp.net/external/mnIYLSAJclE8tlmVWs8tl0F9DN9Sbh-f5nkIos2upCQ/https/img.freepik.com/free-vector/teamwork-puzzle-concept-illustration_114360-13355.jpg"
            className="img-fluid w-full"
          />
        </div>

        <div>
          <div className="section-title">
            <h6 className="fw-normal text-primary">ABOUT US</h6>
            <h4 className="title mb-4">
              Our Highest Ambition <br /> is to Help People
            </h4>

            <p className="text-muted mb-0">
              Get instant helpful resources about anything on the go, easily
              implement secure money transfer solutions, boost your daily
              efficiency, connect to other app users and create your own Fronter
              network, and much more with just a few taps. commodo consequat.
              Duis aute irure.
            </p>

            <div className="mt-4">
              <a href="" className="btn btn-pills btn-primary">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
