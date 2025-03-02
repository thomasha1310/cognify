# Cognify: Modern Concussion Baselining Solution

## Why is baselining necessary?

Concussions are some of the most serious injuries seen in high school and collegiate sports. According to the CDC, [11.9% of US high school students](https://www.statista.com/statistics/1448795/us-high-school-students-who-had-a-sports-related-concussion/) reported receiving a concussion from sports in 2021 alone (over 1.5 million people).

Symptoms can persist for weeks to months, making recovery difficult. In order to track treatment progress, care providers test cognitive ability over time in order to determine when a patient has recovered enough to return to normal activities.

Baseline testing can aid medical professionals by providing a data point to compare against when determining treatment progress.

## Why Cognify?

Since it is important to know the baseline cognitive function when determining treatment progress, many high schools and colleges mandate or recommend concussion baselining for all student athletes. In our experience, however, baselining is rarely used in an effective way to mitigate and ease concussion recovery. Much of this reluctance stems from unintuitive user interfaces, unreliable systems, and long session times. In addition, current baselining solutions are often poorly integrated with treatment centers such as hospitals and clinics, making data more difficult to share.

Cognify seeks to resolve these pain points by **streamlining the user experience** while providing **deeper functionality for care providers**.

### Features

- Reduced test length
- Immediate results sent to school officials and clinicians
- Improved user experience and accessibility
- Improved data management with MongoDB
- Open source and free

## Usage

Please visit the release page and download the JAR file.

Run the JAR using Java:

```
java -jar cognify.jar
```

## Contributing

Please ensure that [JDK-23 or later](https://www.oracle.com/java/technologies/downloads/) and [Maven 3.9 or later](https://maven.apache.org/download.cgi) are installed.

Clone the repository:

```
git clone https://github.com/thomasha1310/cognify.git
```

Navigate to the new directory:

```
cd cognify
```

Compile the project using Maven:

```
mvn package
```

The compiled JAR will be located at `target/cognify-1.0.jar`.

## License

This project is licensed under the [MIT License](LICENSE);
