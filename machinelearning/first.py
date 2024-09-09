import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
import pandas as pd
import os
import json
import tensorflow.keras
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score


print(os.getcwd())

def second_model_tf(): 
    file = os.path.join('machinelearning', 'data', 'data01.csv')    
    absolute_path = os.path.abspath(file)
    print('Loading data from:', absolute_path)  
    data = pd.read_csv(absolute_path)

    print("types of data: ", data.dtypes)   

    print("Data Overview:")
    print(data.info())
    print("\nFirst 5 Rows:")
    print(data.head())

    # convert male to 0 and female to 1 in the padas dataframe
    data['gender'] = data['gender'].apply(lambda x: 0 if x == 'Male' else 1)

    # convert the smoking section to numbers 
    types_of_smoking = ['never', 'No Info', 'current', 'former', 'ever', 'not current'] 
    data['smoking_history'] = data['smoking_history'].apply(lambda x: types_of_smoking.index(x))

    print(data.head())
    print(data.dtypes)


    target = data.pop('diabetes')
    print("first of target ", target.head())

    # convert all the data to float64
    data = data.astype('float64')
    target = target.astype('float64')   

    # Split the data into X and Y
    X = data.to_numpy()
    Y = target.to_numpy()

    # split into train and test
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    X_train = tf.convert_to_tensor(X_train)
    X_test = tf.convert_to_tensor(X_test)
    Y_train = tf.convert_to_tensor(Y_train)
    Y_test = tf.convert_to_tensor(Y_test)

    # create the model
    # print the top of x_train
    print(X_train[:5])
    #normalizer 
    normalizer = tf.keras.layers.Normalization(axis=-1) 
    normalizer.adapt(np.array(X_train))

    # build a linear regression model to predict the target as a percentage
    model = tf.keras.Sequential([
        normalizer,
        tf.keras.layers.Input(shape=(X_train.shape[1],)),   
        tf.keras.layers.Dense(1)
        ])
    
    model.compile(optimizer=tf.optimizers.Adam(learning_rate=0.1), loss='mean_absolute_error')
    model.fit(X_train, Y_train, epochs=5, verbose=1)

    # evalueate the model
    model.evaluate(X_test, Y_test)


    # Ask if the user wants to save the model
    save = input("Do you want to save the model? (y/n): ")  
    if save == 'y':
        # Save the model 
        where = input("Enter the folder where you want to save the model: ")    
        name = input("Enter the filename of the model: ")
        file_dir = os.path.join("machinelearning", "models", where)
        file = os.path.join(file_dir, name)
        model.save(file + '.h5')

    



def first_model():

    file = os.path.join('machinelearning', 'data', 'data01.csv')
    absolute_path = os.path.abspath(file)
    print('Loading data from:', absolute_path)
    data = pd.read_csv(absolute_path)

    # Load the data


    # 1. Overview of the data
    print("Data Overview:")
    print(data.info())
    print("\nFirst 5 Rows:")
    print(data.head())



    # 2. Checking for missing values
    print("\nMissing Values:")
    print(data.isnull().sum())


    data_cleaned = pd.get_dummies(data, columns=['gender', 'smoking_history'], drop_first=True)

    scaler = StandardScaler()

    scaled_columns = ['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']

    data_cleaned[scaled_columns] = scaler.fit_transform(data_cleaned[scaled_columns])


    # 5. Splitting features (X) and target (y)
    X = data_cleaned.drop(columns='diabetes')
    y = data_cleaned['diabetes']

    # 6. Display cleaned data
    print("\nCleaned Data (First 5 Rows):")
    print(data_cleaned.head())



    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 7. Initialize and train the linear regression model
    linreg = LinearRegression()
    linreg.fit(X_train, y_train)

    # 8. Make predictions on the test set
    y_pred = linreg.predict(X_test)

    # 9. Evaluate the model
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print("\nMean Squared Error:", mse)
    print("R-squared:", r2)

    # Optional: Display first few predictions vs actual values
    df_predictions = pd.DataFrame({'Actual': y_test, 'Predicted': y_pred})
    print("\nFirst 5 Predictions vs Actual:")
    print(df_predictions.head())

    # Optional: Visualize predictions vs actual values
    plt.scatter(y_test, y_pred)
    plt.xlabel('Actual Diabetes Value')
    plt.ylabel('Predicted Diabetes Value')
    plt.title('Actual vs Predicted Diabetes Values')
    plt.show()
    return linreg



if __name__ == '__main__':
    second_model_tf()
      