import os
import json

output_dir = os.path.join('beat', 'predictors')
output_dir = os.path.abspath(output_dir)

out_type = input("What type of output: ")

if out_type == 'json':
    output_dir = os.path.join(output_dir, 'json')
    where = input("enter the folder of the model you wish to export: ")
    name = input("Enter the name of the model: ")
    name = name + ".json"
    
    # copy the file to the output directory including the name of the folder and the name of the model 
    file_dir = os.path.join("machinelearning", "models", where)
    file = os.path.join(file_dir, name)
    output_dir = os.path.join(output_dir, where)
    with open(file, 'r') as jf: 
        model_params = json.load(jf)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    file = os.path.join(output_dir, name)
    with open(file, 'w') as jf: 
        json.dump(model_params, jf) # here
    print("Model exported successfully")